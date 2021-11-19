import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { uuid } from 'uuidv4';
import { isBuy, ITransaction, ITransactionAndId } from '../model/ITransaction';
import {
  IDollarCostAverageProfitSummary,
  IDollarCostAverageSummary,
  IDollarCostAverageTransactions,
} from '../model/IDollarCostAverage';

export interface TranscationsState {
  transactions: {
    [id: string]: ITransaction;
  };
  summaryData: {
    dollarCostAveragesTransactions: IDollarCostAverageTransactions;
    dollarCostAveragesSummary: IDollarCostAverageSummary;
    dollarCostAveragesProfitsSummary: IDollarCostAverageProfitSummary;
  };
}

const initialState: TranscationsState = {
  transactions: {},
  summaryData: {
    dollarCostAveragesTransactions: {},
    dollarCostAveragesSummary: {},
    dollarCostAveragesProfitsSummary: {
      profits: {},
      notSoldAmount: {},
    },
  },
};

export const transactionsSlice = createSlice({
  name: 'transactionsData',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addTransaction: (state, action: PayloadAction<ITransaction | null>) => {
      const id = uuid();
      if (action.payload) {
        state.transactions[id] = action.payload;
      } else {
        const defaultITransaction: ITransaction = {
          symbol: '',
          date: Date.now(),
          amount: 0,
          price: 0,
        };
        state.transactions[id] = defaultITransaction;
      }
    },
    bulkAddTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      action.payload.forEach((transaction) => {
        const id = uuid();
        state.transactions[id] = transaction;
      });
    },
    deleteAllTransactions: (state) => {
      state.transactions = {};
    },
    updateTransaction: (
      state,
      action: PayloadAction<{ id: string; transaction: Partial<ITransaction> }>
    ) => {
      const orig = state.transactions[action.payload.id];
      const update = action.payload.transaction;
      // hard-code the updated fields
      if (update.amount !== undefined) orig.amount = update.amount;
      if (update.date !== undefined) orig.date = update.date;
      if (update.price !== undefined) orig.price = update.price;
      if (update.symbol !== undefined) orig.symbol = update.symbol;
    },
    removeTransaction: (state, action: PayloadAction<{ id: string }>) => {
      delete state.transactions[action.payload.id];
    },
    updateDollarCostAverageTransactions: (
      state,
      action: PayloadAction<IDollarCostAverageTransactions>
    ) => {
      state.summaryData.dollarCostAveragesTransactions = action.payload;
    },
    updateDollarCostAverageSummary: (
      state,
      action: PayloadAction<IDollarCostAverageSummary>
    ) => {
      state.summaryData.dollarCostAveragesSummary = action.payload;
    },
    updateDollarCostAverageProfitSummary: (
      state,
      action: PayloadAction<IDollarCostAverageProfitSummary>
    ) => {
      state.summaryData.dollarCostAveragesProfitsSummary = action.payload;
    },
  },
});

export const {
  addTransaction,
  bulkAddTransactions,
  deleteAllTransactions,
  updateTransaction,
  removeTransaction,
  updateDollarCostAverageTransactions,
  updateDollarCostAverageSummary,
  updateDollarCostAverageProfitSummary,
} = transactionsSlice.actions;

export const selectTransactions = (state: RootState) =>
  state.transactionsData.transactions;
export const selectDCASummaries = (state: RootState) =>
  state.transactionsData.summaryData.dollarCostAveragesSummary;
export const selectDCATransactions = (state: RootState) =>
  state.transactionsData.summaryData.dollarCostAveragesTransactions;
export const selectDCAProfitSummary = (state: RootState) =>
  state.transactionsData.summaryData.dollarCostAveragesProfitsSummary;

export const selectDCATransactionsMemoized = createSelector(
  [selectTransactions],
  (transactionsData) => {
    // deep copy transactions map to a list
    const transactions: ITransactionAndId[] = Object.entries(
      transactionsData
    ).map((entry) => {
      return {
        id: entry[0],
        amount: entry[1].amount,
        date: entry[1].date,
        price: entry[1].price,
        symbol: entry[1].symbol,
      };
    });

    // sort transactions by date
    transactions.sort((a, b) => a.date - b.date);

    /** Map containing buys */
    const dcaTransactions: IDollarCostAverageTransactions = {};
    /** Map containing symbols to "sell transactions" sorted by date */
    const sellsMap: Map<string, ITransactionAndId[]> = new Map();
    transactions.forEach((transaction) => {
      if (isBuy(transaction)) {
        dcaTransactions[transaction.id] = {
          result: {
            amount: transaction.amount,
            date: transaction.date,
            price: transaction.price,
            symbol: transaction.symbol,
          },
          sells: {},
        };
      } else {
        let sellsListForSymbol = sellsMap.get(transaction.symbol);
        if (!sellsListForSymbol) sellsListForSymbol = [];
        sellsListForSymbol.push(transaction);
        sellsMap.set(transaction.symbol, sellsListForSymbol);
      }
    });

    // apply all possible sells to each buy
    const buys = Object.values(dcaTransactions);
    buys.forEach((dcaTransaction) => {
      const buy = dcaTransaction.result;
      // look up based on the symbol
      const symbol = buy.symbol;
      const sells = sellsMap.get(symbol);
      // apply as many sells as possible to each buy
      while (sells && sells.length !== 0 && buy.amount !== 0) {
        const sell = sells.pop();
        if (sell) {
          let amountApplied = 0;
          // apply all of the sell to buy
          if (-1 * sell.amount <= buy.amount) {
            amountApplied = sell.amount;
            buy.amount += sell.amount;
            sell.amount = 0;
          }
          // apply partial sell to buy
          else {
            amountApplied = -1 * buy.amount;
            sell.amount += buy.amount;
            buy.amount = 0;
            // push the sell back on to use for other buys
            sells.push(sell);
          }
          dcaTransaction.sells[sell.id] = {
            amount: amountApplied,
            date: sell.date,
            price: sell.price,
            symbol: sell.symbol,
          };
        }
      }
    });
    return dcaTransactions;
  }
);

export const selectDCATransactionsAmountRemaining = createSelector(
  [selectDCATransactionsMemoized],
  (dcaTransactions) => {
    // flatten out the transactions to be easily accessible
    const transactionsAmountLeft: { [id: string]: number } = {};
    const entries = Object.entries(dcaTransactions);
    entries.forEach((entry) => {
      const buyUUID = entry[0];
      transactionsAmountLeft[buyUUID] = entry[1].result.amount;
      const sellEntries = Object.entries(entry[1].sells);
      sellEntries.forEach((sellEntry) => {
        const sellUUID = sellEntry[0];
        transactionsAmountLeft[sellUUID] = sellEntry[1].amount;
      });
    });
    return transactionsAmountLeft;
  }
);

export default transactionsSlice.reducer;

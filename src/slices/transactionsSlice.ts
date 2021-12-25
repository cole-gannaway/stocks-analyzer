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
}

const initialState: TranscationsState = {
  transactions: {},
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
  },
});

export const {
  addTransaction,
  bulkAddTransactions,
  deleteAllTransactions,
  updateTransaction,
  removeTransaction,
} = transactionsSlice.actions;

export const selectTransactions = (state: RootState) =>
  state.transactionsData.transactions;

export const selectAppliedTransactions = createSelector(
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
  [selectAppliedTransactions],
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

function addToSumMap(map: Map<string, number>, symbol: string, amount: number) {
  let sum = map.get(symbol);
  if (!sum) sum = 0;
  sum += amount;
  map.set(symbol, sum);
}

export const selectAppliedTransactionsSummarized = createSelector(
  [selectAppliedTransactions],
  (dcaTransactions) => {
    // sum up the amount left per symbol
    const symbolToAmountsSumMap: Map<string, number> = new Map<
      string,
      number
    >();
    // sum up the (amount * price) left per symbol for a weighted sum
    const symbolToWeightedSumMap: Map<string, number> = new Map<
      string,
      number
    >();
    Object.keys(dcaTransactions).forEach((buyId) => {
      const buy = dcaTransactions[buyId];
      if (buy.result.amount !== 0) {
        const symbol = buy.result.symbol;
        addToSumMap(symbolToAmountsSumMap, symbol, buy.result.amount);
        addToSumMap(
          symbolToWeightedSumMap,
          symbol,
          buy.result.amount * buy.result.price
        );
      }
    });

    const dcaSummary: IDollarCostAverageSummary = {};
    symbolToAmountsSumMap.forEach((amountSum, symbol) => {
      const weightedSum = symbolToWeightedSumMap.get(symbol);
      if (weightedSum) {
        const dcaPrice = weightedSum / amountSum;
        dcaSummary[symbol] = {
          symbol: symbol,
          price: dcaPrice,
        };
      }
    });
    return dcaSummary;
  }
);

export const selectAppliedTransactionsProfitSummary = createSelector(
  [selectAppliedTransactions, selectTransactions],
  (dcaTransactions, transactionsData) => {
    const symbolToSpendingsSumMap: Map<string, number> = new Map<
      string,
      number
    >();
    const symbolToEarningsSumMap: Map<string, number> = new Map<
      string,
      number
    >();
    const symbolToAmountNotSoldMap: Map<string, number> = new Map<
      string,
      number
    >();
    Object.keys(dcaTransactions).forEach((buyId) => {
      const buy = dcaTransactions[buyId];
      const symbol = buy.result.symbol;
      const sellIds = Object.keys(buy.sells);

      const amountNotSold = buy.result.amount;
      const amountSold = transactionsData[buyId].amount - amountNotSold;

      // sum up how much was bought but not sold
      if (amountNotSold !== 0) {
        addToSumMap(symbolToAmountNotSoldMap, symbol, amountNotSold);
      }
      // sum up how much was bought and sold
      addToSumMap(
        symbolToSpendingsSumMap,
        symbol,
        amountSold * transactionsData[buyId].price
      );
      sellIds.forEach((sellId) => {
        const sell = buy.sells[sellId];
        // sum up returns
        const returns = -1 * sell.amount * sell.price;
        // add to earnings
        addToSumMap(symbolToEarningsSumMap, symbol, returns);
      });
    });

    // combine
    const symbolToProfitsSumMap: Map<string, number> = new Map<
      string,
      number
    >();
    symbolToSpendingsSumMap.forEach((val, key) =>
      addToSumMap(symbolToProfitsSumMap, key, -1 * val)
    );
    symbolToEarningsSumMap.forEach((val, key) =>
      addToSumMap(symbolToProfitsSumMap, key, val)
    );

    // return
    const profitSummary: IDollarCostAverageProfitSummary = {
      profits: {},
      notSoldAmount: {},
    };
    symbolToProfitsSumMap.forEach(
      (val, key) => (profitSummary.profits[key] = val)
    );
    symbolToAmountNotSoldMap.forEach(
      (val, key) => (profitSummary.notSoldAmount[key] = val)
    );
    return profitSummary;
  }
);

export default transactionsSlice.reducer;

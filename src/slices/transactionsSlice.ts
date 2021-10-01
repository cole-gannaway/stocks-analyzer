import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { uuid } from 'uuidv4';
import { ITransaction } from '../model/ITransaction';
import {
  IDollarCostAverageProfitSummary,
  IDollarCostAverageSummary,
  IDollarCostAverageTransactions,
} from '../model/IDollarCostAverage';
import CURRENT_DATA from '../config/current_data.json';

const currentPrices: { [symbol: string]: number } = {};
CURRENT_DATA.data.forEach((data) => {
  currentPrices[data.symbol] = data.quote.USD.price;
});

export interface TranscationsState {
  transactions: {
    [id: string]: ITransaction;
  };
  summaryData: {
    dollarCostAveragesTransactions: IDollarCostAverageTransactions;
    dollarCostAveragesSummary: IDollarCostAverageSummary;
    dollarCostAveragesProfitsSummary: IDollarCostAverageProfitSummary;
  };
  currentPrices: {
    [symbol: string]: number;
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
  currentPrices: currentPrices,
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
  updateTransaction,
  removeTransaction,
  updateDollarCostAverageTransactions,
  updateDollarCostAverageSummary,
  updateDollarCostAverageProfitSummary,
} = transactionsSlice.actions;

export const selectTransactions = (state: RootState) =>
  state.transactionsData.transactions;
export const selectCurrentPrices = (state: RootState) =>
  state.transactionsData.currentPrices;
export const selectDCASummaries = (state: RootState) =>
  state.transactionsData.summaryData.dollarCostAveragesSummary;
export const selectDCATransactions = (state: RootState) =>
  state.transactionsData.summaryData.dollarCostAveragesTransactions;
export const selectDCAProfitSummary = (state: RootState) =>
  state.transactionsData.summaryData.dollarCostAveragesProfitsSummary;

export default transactionsSlice.reducer;

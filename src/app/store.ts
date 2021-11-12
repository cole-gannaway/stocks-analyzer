import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currentPricesSlice from '../slices/currentPricesSlice';
import transactionsSlice from '../slices/transactionsSlice';

export const store = configureStore({
  reducer: {
    transactionsData: transactionsSlice,
    currentPrices: currentPricesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

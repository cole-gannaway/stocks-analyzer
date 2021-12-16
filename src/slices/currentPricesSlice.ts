import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { CryptoDictionary } from '../firebase/firebase';

const initialState: CryptoDictionary = {};

export const currentPricesSlice = createSlice({
  name: 'currentPrices',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateCurrentPrices: (state, action: PayloadAction<CryptoDictionary>) => {
      Object.entries(action.payload).forEach((entry) => {
        const key = entry[0];
        const value = entry[1];
        state[key] = value;
      });
    },
  },
});

export const selectCurrentPrices = (state: RootState) => state.currentPrices;

export const { updateCurrentPrices } = currentPricesSlice.actions;

export default currentPricesSlice.reducer;

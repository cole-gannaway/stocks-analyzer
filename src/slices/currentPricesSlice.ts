import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { CryptoDictionary, getCryptosPrices } from '../firebase/firebase';

const initialState: CryptoDictionary = {};

export const fetchCurrentCryptoPrices = createAsyncThunk(
  'currentPrices/getCryptosPrices',
  async () => {
    const currentPrices = await getCryptosPrices();
    return currentPrices;
  }
);

export const currentPricesSlice = createSlice({
  name: 'currentPrices',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCryptoPrices.fulfilled, (state, action) => {
      console.log(action.payload);
      Object.entries(action.payload).forEach((entry) => {
        const key = entry[0];
        const value = entry[1];
        state[key] = value;
      });
    });
  },
});

export const selectCurrentPrices = (state: RootState) => state.currentPrices;

export default currentPricesSlice.reducer;

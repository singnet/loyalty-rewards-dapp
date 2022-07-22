import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WalletState = {
  showConnectionModal: boolean;
  error?: string;
  cardanoWalletAddress: any;
  cardanoWalletName: string | null;
  startMappingCardano: boolean;
  cardanoMapedDate: string | null;
};

const initialState: WalletState = {
  showConnectionModal: false,
  cardanoWalletAddress: null,
  cardanoWalletName: 'Nami',
  startMappingCardano: false,
  cardanoMapedDate: null,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setShowConnectionModal(state, action: PayloadAction<boolean>) {
      // We can directly mutate the state,
      // The redux-toolkit will take care of the diff
      state.showConnectionModal = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
    setCardanoWalletAddress: (state, action) => {
      state.cardanoWalletAddress = action.payload;
    },
    setCardanowalletName: (state, action) => {
      state.cardanoWalletName = action.payload;
    },
    setStartMapingCardano: (state, action) => {
      state.startMappingCardano = action.payload;
    },
    setCardanoMapedDate: (state, action) => {
      state.cardanoMapedDate = action.payload;
    },
  },
});

export const {
  setShowConnectionModal,
  setError: setWalletError,
  setCardanoWalletAddress,
  setCardanowalletName,
  setStartMapingCardano,
  setCardanoMapedDate,
} = walletSlice.actions;
const walletReducer = walletSlice.reducer;
export default walletReducer;

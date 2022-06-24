import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AirdropStatusState = {
  airdropStatusMessage: string | null;
};

const initialState: AirdropStatusState = {
  airdropStatusMessage: null,
};

export const airdropStatusSlice = createSlice({
  name: 'airdropStatus',
  initialState,
  reducers: {
    setAirdropStatus(state, action: PayloadAction<string | null>) {
      state.airdropStatusMessage = action.payload;
    },
  },
});

export const { setAirdropStatus } = airdropStatusSlice.actions;
const airdropStatusReducer = airdropStatusSlice.reducer;
export default airdropStatusReducer;

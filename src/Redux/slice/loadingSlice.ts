import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface loadingState {
  value: number;
}

const initialState: loadingState = {
  value: 1,
};

export const loadingSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    loading: (state) => {
      state.value = 0;
    },
    unLoadding: (state) => {
      state.value = 1;
    },
  },
});
export const { loading, unLoadding } = loadingSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default loadingSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface loadingState {
  value: boolean;
}

const initialState: loadingState = {
  value: false,
};

export const loadingSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    loading: (state) => {
      state.value = true;
    },
    unLoadding: (state) => {
      state.value = false;
    },
  },
});
export const { loading, unLoadding } = loadingSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default loadingSlice.reducer;

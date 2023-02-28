import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface UserState {
  _id: string;
  name: string;
  phone: string;
  email: string;
}

// Define the initial state using that type
const initialState: UserState = {
  _id: '',
  name: '',
  phone: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state._id = '';
      state.name = '';
      state.phone = '';
      state.email = '';
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

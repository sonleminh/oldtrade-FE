import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface PostState {
  post: [
    {
      _id: String;
      category: String;
      title: String;
      image: any;
      price: String;
      description: String;
      address: any;
    }
  ];
  postList: any;
}

// Define the initial state using that type
const initialState: PostState = {
  post: [
    {
      _id: '',
      category: '',
      title: '',
      image: [],
      price: '',
      description: '',
      address: [],
    },
  ],
  postList: [],
};

export const postSlice = createSlice({
  name: 'post',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getAllPost: (state, action: PayloadAction<PostState>) => {
      state.postList = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { getAllPost } = postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPost = (state: RootState) => state.post;

export default postSlice.reducer;

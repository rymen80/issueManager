import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  users: [],
  selectedUser: {
    id: '',
    username: '',
  },
  moreState: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    getUsers: (state, action) => ({
      ...state,
      users: action.payload
    }),
    getUser: (state, action) => ({ ...state, selectedUser: action.payload }),
  },
});

export const {
  getUsers,
  getUser,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

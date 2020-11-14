import { createSlice } from "@reduxjs/toolkit";
/**
 * @description Set our initial User state that we will use throghout the project
 */
const INITIAL_STATE = {
  users: [],
  userauth: localStorage.getItem("userauth")
    ? JSON.parse(localStorage.getItem("userauth"))
    : null,
  invalidLogin: false,
  selectedUser: {
    id: "",
    username: "",
  },
  moreState: false,
};
/**
 * @description Create UserSlice, this will hold all of our reducers and initialize our redux store
 */
const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    getUsers: (state, action) => ({
      ...state,
      users: action.payload,
    }),
    getUser: (state, action) => ({
      ...state,
      selectedUser: action.payload,
    }),
    setUserToken: (state, action) => ({
      ...state,
      userauth: action.payload.userauth,
      invalidLogin: action.payload.invalidLogin,
    }),
  },
});

export const { getUsers, getUser, setUserToken } = userSlice.actions;

export const userReducer = userSlice.reducer;

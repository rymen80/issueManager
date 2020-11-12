import { createSlice } from '@reduxjs/toolkit';


const INITIAL_STATE = {
  adminauth:localStorage.getItem('adminauth') ? JSON.parse(localStorage.getItem('adminauth')) : null,
  invalidLogin:false,
  authorized:true,
  selectedUser: {
    id: "",
    username: "",
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState: INITIAL_STATE,
  reducers: {
    setAdminToken: (state, action) => ({
    
        ...state,        
        adminauth: action.payload.adminauth,
        invalidLogin:action.payload.invalidLogin,
        authorized:action.payload.authorized,
        
      }),
      getUser: (state, action) => ({
        ...state,
        selectedUser: action.payload,
      }),
    },
});

export const {
  setAdminToken,
  getUser,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
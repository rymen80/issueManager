import { createSlice } from '@reduxjs/toolkit';


const INITIAL_STATE = {
  adminauth:localStorage.getItem('adminauth') ? JSON.parse(localStorage.getItem('adminauth')) : null,
  invalidLogin:false,
  authorized:true,
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
        
      })
    },
});

export const {
  setAdminToken,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  visibility: false,
};

const userPageSlice = createSlice({
  name:'userPage',
  initialState: INITIAL_STATE,
  reducers: {

    setVisibility: (state, action) => {
      return{ 
        ...state,
        visibility: !state.visibility,
      }
    }
  },
});

export const{
  setVisibility,
} = userPageSlice.actions;

export const userPageReducer = userPageSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

//  Action types, Action creators, another file for your reducer
const INITIAL_STATE = {
  token:!!localStorage.getItem('token') ? localStorage.getItem('token') : null,
};

const viewerSlice = createSlice({
  name: 'viewer',
  initialState: INITIAL_STATE,
  reducers: {
    // This will become a function
    // that is an action creator
    // the action type of this action creator is going to be
    // The name of this slice
    // + the name of the reducer
    // action = viewer/setViewerToken

    // Action type for setViewerToken
    // viewer/setViewerToken
    setViewerToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});



export const {
  setViewerToken,
} = viewerSlice.actions;

export const viewerReducer = viewerSlice.reducer;

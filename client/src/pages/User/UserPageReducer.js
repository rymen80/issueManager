import { createSlice } from "@reduxjs/toolkit";

/**
 * @description Set our initial state that we will use throghout the project
 */
const INITIAL_STATE = {
  projects: [],
  labels: [],
  users: [],
  issues: [],
  visibility: false,
  selectedProject:{},
};
/**
 * @description Create UserPageSlice, this will hold all of our reducers and initialize our redux store
 */
const userPageSlice = createSlice({
  name: "userPage",
  initialState: INITIAL_STATE,
  reducers: {
    setVisibility: (state, action) => {
      return {
        ...state,
        visibility: !state.visibility,
      };
    },
    setSelectedProject:(state,action) =>{
      return{
        ...state,
        selectedProject:action.payload
      }
    },
    setUserProjects:(state,action) =>{
      return{
        ...state,
        projects:action.payload
      }
    },
    setIssues:(state,action) =>{
      return{
        ...state,
        issues: action.payload
      }
    },
  },
});

export const { setVisibility,setSelectedProject,setUserProjects,setIssues } = userPageSlice.actions;

export const userPageReducer = userPageSlice.reducer;

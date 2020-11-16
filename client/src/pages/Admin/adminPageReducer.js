import { createSlice } from '@reduxjs/toolkit';
// import actions from 'redux-form/lib/actions';


const INITIAL_STATE = {
  projects:[],
  users:[],
  labels:[],
  selectedProject:{},
  selectedUser:{},
};

const adminPageSlice = createSlice({
  name: 'adminPage',
  initialState: INITIAL_STATE,
  reducers: {
    getAllProjects:(state,action)=>({
     ...state, projects:action.payload,

    }),
    setSelectedProject:(state,action) =>{
      return{
        ...state,
        selectedProject:action.payload
      }
    },
    setSelectedUser:(state,action) =>{
      return{
        ...state,
        selectedUser:action.payload
      }
    }
  },
});

export const {getAllProjects,setSelectedProject,setSelectedUser}=adminPageSlice.actions;

export const adminPageReducer =adminPageSlice.reducer;
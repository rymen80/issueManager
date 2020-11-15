import React,{useState,useEffect} from  'react'
import { DataGrid } from '@material-ui/data-grid';
import {useDispatch, useSelector} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import {setIssues} from "../../User/UserPageReducer";

// import {useState} from 'react-router-dom'


const columns = [
  { field: 'summary', headerName: 'Title', width: 125},
  { field: 'project_id', headerName: 'Description', width: 250 },
  { field: 'project_name', headerName: 'Reported By', width: 125 },
  { field: 'project_key', headerName: 'Assigned To', width: 125},
  { field: 'created_date', headerName: 'Priority', width: 115 },
  { field: 'description', width: 0 ,sortable:false},
  // { field: 'lastName', headerName: 'Last name', width: 130 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
 ]


export default function ViewAllProjects(){
  let selectedProj;
  let projectId = useSelector((state) => state.userPage.selectedProject.project_id);
  const userauth = useSelector((state) => state.user.userauth.token);
  const dispatch = useDispatch();
  const [project,setSelectedProject]=useState({});
  
  
  // = [...st.selectedProject];
  
  
  console.log("PROJECT", project)

 

  useEffect(() => {
    const getData = async () => {
      try {
        /** @summary Get only those projects to which user belong */

       const issuesRequest = await axios.get(`/api/issues?projectid=${projectId}`, {
            headers: {
            authorization: userauth,
          },
          })
            console.log("ISSUES", issuesRequest.data)
         
       
        
      //save all the projects from get request to issues
     
       
        dispatch(setIssues(issuesRequest.data))
      
      } catch (e) {
        throw new Error(e);
      }
    };
    getData();
  }, []);
  let issues= useSelector((state) => state.userPage.issues);
  const rows=issues;
  const rowSelection =(param)=>{
    selectedProj=param.data;
    console.log(selectedProj);
    setSelectedProject(selectedProj);
  }

  return (
    <Container>
    <Grid container>
      <Grid item xs={false} md={12}>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={30} onRowSelected={rowSelection} disableMultipleSelection hideFooterSelectedRowCount/>
      </div>
      </Grid>
    </Grid>
    </Container>
    );
}
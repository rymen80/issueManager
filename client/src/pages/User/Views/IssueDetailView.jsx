import React,{useState} from  'react'
import { DataGrid } from '@material-ui/data-grid';
import {useSelector} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

// import {useState} from 'react-router-dom'


const columns = [
  { field: 'id', headerName: '#', width: 50},
  { field: 'project_id', headerName: 'ID', width: 50 },
  { field: 'project_name', headerName: 'Name', width: 160 },
  { field: 'project_key', headerName: 'Key', width: 100 },
  { field: 'created_date', headerName: 'Created Date', width: 220 },
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
  const st= useSelector(state=>state.adminPage);
  const [project,setSelectedProject]=useState({});
  let i=1;
  let projects = [...st.projects];
  projects = projects.map(item =>({...item,id:i++}));
  
  const rows=projects;
  const rowSelection =(param)=>{
    selectedProj=param.data;
    console.log(selectedProj);
    setSelectedProject(selectedProj);
  }

  return (
    <Container>
    <Grid container>
      <Grid item xs={false} md={7}>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={30} onRowSelected={rowSelection} disableMultipleSelection hideFooterSelectedRowCount/>
      </div>
      </Grid>
      <Grid item>
        <form>

          <input type="text" value={project.project_name} disabled></input>
        </form>
      </Grid>
    </Grid>
    </Container>
    );
}
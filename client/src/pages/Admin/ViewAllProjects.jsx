import React from  'react'
import { DataGrid } from '@material-ui/data-grid';
import {useSelector} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";


const columns = [
  { field: 'id', headerName: '#', width: 70 },
  { field: 'project_id', headerName: 'ID', width: 70 },
  { field: 'project_name', headerName: 'Name', width: 130 },
  { field: 'project_key', headerName: 'Key', width: 130 },
  { field: 'created_date', headerName: 'Created Date', width: 130 },
  // { field: 'lastName', headerName: 'Last name', width: 130 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
]

export default function ViewAllProjects(){
  const st= useSelector(state=>state.adminPage);
  let i=1;
  let projects = [...st.projects];
  projects = projects.map(item =>({...item,id:i++}));
  console.log(projects)
  const rows=projects;
  const rowSelection =(param)=>{
    console.log(param);
  }

  return (
    <Container>
    <Grid container>
      <Grid item xs={false} sm={4} md={7}>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={15} onRowSelected={rowSelection} disableMultipleSelection/>
      </div>
      </Grid>
    </Grid>
    </Container>
    );
}
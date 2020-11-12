import React from 'react';
import { Switch, Route,useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import '../../styles/App.css';
import * as components from '../common/components';
import AdminCards from './AdminCards';
import ViewAllProjects from './ViewAllProjects'
// import {AdminContainer} from './AdminCards';


export function AdminPage(){
  return (
    <>
    <components.AdminNavbar /> 
    {/* <AdminCards /> */}
    <Switch>
    <Route exact path='/admin/adminpage' component={AdminCards}/>
      <Route path='/admin/adminpage/projects' component={ViewAllProjects}/>
      {/* <Route exact path='/users/create' component={UserCreateForm}/>
      <Route exact path='/users/user/:userId' component={UserSingleView} /> */}
    </Switch>
    </>
  );
}
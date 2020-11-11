import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import '../../styles/App.css';
import * as components from '../common/components';
import AdminCards from './AdminCards';
// import {AdminContainer} from './AdminCards';


export function AdminPage(){
  return (
    <>
    <components.AdminNavbar /> 
    <AdminCards />
    <Switch>
      {/* <Route exact path='/admin/adminpage/cards' component={AdminCards}/> */}
      {/* <Route exact path='/users/create' component={UserCreateForm}/>
      <Route exact path='/users/user/:userId' component={UserSingleView} /> */}
    </Switch>
    </>
  );
}
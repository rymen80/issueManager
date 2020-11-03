// This controller will be in charge of which component from the User folder should be shown
// to the user right now
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  UserCreateForm,
  UserListView,
  UserSingleView,
} from './UserViews';

export const UserContainer = (props) => {
  return (
    <Switch>
      <Route exact path='/users' component={UserListView}/>
      <Route exact path='/users/create' component={UserCreateForm}/>
      <Route exact path='/users/user/:userId' component={UserSingleView} />
    </Switch>
  );
};

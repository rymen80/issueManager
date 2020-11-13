import React from "react";
import { Switch, Route } from "react-router-dom";
import { NavbarUser } from "../common/components";
import * as components from "../common/components";
import UserView from './UserView';

export const UserPage = (props) => {
  return (
    <>
      <NavbarUser />
      <Switch>
      <Route
          exact
          path="/userpage"
          component={UserView}
        />
        <Route          
          path="/userpage/profile"
          component={components.UserProfile}
        />
      </Switch>
    </>
  );
};

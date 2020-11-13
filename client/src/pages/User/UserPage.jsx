import React from "react";
import { Switch, Route } from "react-router-dom";
import { NavbarUser } from "../common/components";
import * as components from "../common/components";
import UserView from './UserView';

/**
 * 
 * @description UserPage component declaration, set up routes to our render UserView component
 * or our UserProfile, depending on route selected
 */
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

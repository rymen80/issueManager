import React from "react";
import {
  // BrowserRouter as Router,
  Route,
  // Switch,
  Redirect,
} from "react-router-dom";
export const ProtectedRoute = ({ component: Comp, loggedIn, path,redirectTo, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
};
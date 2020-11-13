import React from "react";
import { Switch, Route} from "react-router-dom";
import { Footer, NavbarUser, UserProfile } from "../common/components";
import UserView from "./UserView";

export const UserPage = () => {
  return (
    <>
      <NavbarUser />
      <Switch>
        <Route exact path="/userpage" component={UserView} />
        <Route path="/userpage/profile" component={UserProfile} />
      </Switch>
      <Footer />
    </>
  );
};

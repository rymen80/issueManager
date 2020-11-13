import React from "react";
import { Switch, Route } from "react-router-dom";
// import "../../styles/App.css";
import * as components from "../common/components";
import { AdminCards, ViewAllProjects } from "./views";
// import  from "./Views/ViewAllProjects";

export function AdminPage() {
  return (
    <>
      <components.AdminNavbar />
      <Switch>
        <Route exact path="/admin/adminpage" component={AdminCards} />
        <Route path="/admin/adminpage/projects" component={ViewAllProjects} />
        <Route path="/admin/adminpage/userprofile" component={components.UserProfile} />
      </Switch>
      <components.Footer />
    </>
  );
}

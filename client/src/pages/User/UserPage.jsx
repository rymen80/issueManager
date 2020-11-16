import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { NavbarUser, Footer, UserProfile } from "../common/components";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { StatusCardsView } from "./Views/StatusCardsView";
import CreateIssueForm from "../common/components/CreateIssue";
import IssueDetailView from "./Views/IssueDetailView";

const useStyles = makeStyles({
  button: {
    margin: "6px",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

/**
 *
 * @description UserPage component declaration, set up routes to our render UserView component
 * or our UserProfile, depending on route selected
 */
export const UserPage = (props) => {
  const classes = useStyles();

  return (
    <Router>
      <NavbarUser />
      <Grid container>
        <Grid item sm={12}>
          <Switch>
            <Route exact path="/userpage" component={StatusCardsView} />
            <Route path="/userpage/profile" component={UserProfile} />
            <Route path="/userpage/create" component={CreateIssueForm} />
            <Route path="/userpage/allissues" component={IssueDetailView} />
          </Switch>
        </Grid>
      </Grid>
      <Footer />
    </Router>
  );
};

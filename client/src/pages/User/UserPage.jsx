import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { NavbarUser } from "../common/components";
import * as components from "../common/components";
import UserView from "./UserView";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { StatusCardsView } from "./Views/StatusCardsView";
import CreateIssueForm from "../common/components/CreateIssue";
import BasicTable from "../common/components/ViewIssues";

const useStyles = makeStyles({
  // leftbar: {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "flex-start",
  //   borderRight: "1px solid #fd5429",
  //   padding: "5px",
  //   marginLeft: "2px",
  // },
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
        {/* <Grid item sm={2}>
          <div style={{ height: "100%" }} className={classes.leftbar}>
            <Button variant="contained" color="primary" className={classes.button}>
              All Issues <ArrowIcon />
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
              Assigned to me <ArrowIcon />
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
              Reported By me <ArrowIcon />
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
              Board <ArrowIcon />
            </Button>
          </div>
        </Grid> */}
        <Grid item sm={12}>
          <Switch>
            <Route exact path="/userpage" component={StatusCardsView} />
            <Route
              path="/userpage/profile"
              component={components.UserProfile}
            />
            <Route path="/userpage/create" component={CreateIssueForm} />
          </Switch>
        </Grid>
      </Grid>
      <components.Footer />
    </Router>
  );
};

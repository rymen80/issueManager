import React from "react";
import { Switch, Route } from "react-router-dom";
import { NavbarUser } from "../common/components";
import * as components from "../common/components";
import UserView from "./UserView";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowIcon from '@material-ui/icons/ArrowForwardIosRounded';
import {StatusCardsView} from './Views/StatusCardsView'

const useStyles = makeStyles({
  leftbar: {
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-evenly",
    borderRight:"1px solid #fd5429",
    padding:"5px",
    marginLeft:"2px"
    
  },
  status: {
    margin: "100px 10px",
    display: "flex",
    justifyContent: "space-around",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  issues: {
    display: "flex",
    justifyContent: "center",    

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
    <>
      <NavbarUser />
      <Grid container>
        <Grid item sm={2}>
          <div style={{ height: "100%" }} className={classes.leftbar}>
            <Button variant="contained" color="primary">All Issues <ArrowIcon/></Button>
            <Button variant="contained" color="primary">Assigned to me <ArrowIcon/></Button>
            <Button variant="contained" color="primary">Reported By me <ArrowIcon/></Button>
            <Button variant="contained" color="primary">Board <ArrowIcon/></Button>
            </div>
          </Grid>
          <Grid item sm={10}>
            <Switch>
            <Route exact path="/userpage" component={StatusCardsView} />
            <Route
              path="/userpage/profile"
              component={components.UserProfile}
            />
          </Switch>
        </Grid>
      </Grid>
      <components.Footer />
    </>
  );
};

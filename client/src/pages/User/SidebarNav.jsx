import React from 'react';
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowIcon from "@material-ui/icons/ArrowForwardIosRounded";
import {useHistory,} from 'react-router-dom';


const useStyles = makeStyles({
  leftbar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRight: "1px solid #fd5429",
    padding: "5px",
    marginLeft: "2px",
  },
  button: {
    margin: "6px",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },  
});

const SidebarNav = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleAllIssuesView = () => {
    console.log('HELLO')
    history.push("/userpage/allissues")
  }

  return(
    <Grid item sm={2}>
  <div style={{ height: "100%" }} className={classes.leftbar}>
    <Button variant="contained" onClick={handleAllIssuesView} color="primary" className={classes.button}>
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
</Grid>
  )


}

export default SidebarNav;

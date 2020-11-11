import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import * as muiCore from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import issUseLogo from "../../../images/issUseLogo.png";


import { useSelector, useDispatch } from "react-redux";
// import {setViewerToken} from '../../Viewer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
    backgroundColor: "#f03311!important",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    backgroundColor: "white",
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "20px",
    borderColor:"blue",
    border:"1px"
  },
  accountButton:{
    fontSize:"12px",
    borderColor:"white"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const {selectedUser} = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const history = useHistory();

 

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    localStorage.removeItem("adminauth");
    // dispatch(setViewerToken(null));
    history.push("/admin");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <muiCore.Toolbar>
          <muiCore.Typography variant="h6" className={classes.logo}>
            <img src={issUseLogo} height={"20px"} />
          </muiCore.Typography>
          <muiCore.Typography variant="h6" className={classes.title}>
            Admin Console
          </muiCore.Typography>

          <div>
            <muiCore.IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className={classes.accountButton}
            >
              {selectedUser.username + "  "}
              <AccountCircle />
            </muiCore.IconButton>
            <muiCore.Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <muiCore.MenuItem onClick={handleClose}>Profile</muiCore.MenuItem>
              <muiCore.MenuItem onClick={handleSignOut}>
                Sign Out
              </muiCore.MenuItem>
            </muiCore.Menu>
          </div>
        </muiCore.Toolbar>
      </AppBar>
    </div>
  );
}

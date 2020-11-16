import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  IconButton,
  Button,
  useTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AccountCircle } from "@material-ui/icons";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import ArrowIcon from "@material-ui/icons/ArrowForwardIosRounded";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import CancelIcon from "@material-ui/icons/Cancel";
import ProjectSelectorNew from "./ProjectSelectorNew";
import issUseLogo from "../../../images/issUseLogo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#3f51b5",
    top: 100,
    color: "white",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
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
    borderColor: "#f36106",
    border: "1px solid",
  },
  userIcon: {
    right: "2%",
    position: "absolute",
    borderBottom: "1px solid #f36106",
    color: "#399ae8",
  },
  projectButton: {
    marginLeft: "40px",
  },
  accountButton: {
    fontSize: "12px",
    borderColor: "white",
    color: "white",
  },
  reportButton: {
    marginLeft: "30px",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuicon: {
    color: "#f36106",
  },
  button: {
    color: "white",
  },
}));

export default function NavbarUser() {
  const classes = useStyles();
  const selectedUser = localStorage.getItem("userauth")
    ? JSON.parse(localStorage.getItem("userauth")).username
    : "";
  const auth=localStorage.getItem("userauth")
  ? JSON.parse(localStorage.getItem("userauth")).token
  : "";
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const [opens, setOpen] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {    
    setAnchorEl(null);
    history.push({
      pathname: "/userpage/profile",
      state: { backLocation: location.pathname, localstorageItem: "userauth" },
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    history.push("/userpage/create");
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    localStorage.removeItem("userauth");
    history.go(0);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleAllIssuesClick = () => {
    setOpen(false);
    history.push("/userpage/allissues");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarPosition]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, opens && classes.hide)}
          >
            <MenuIcon className={classes.menuicon} />
          </IconButton>
          <Typography variant="h6" className={classes.logo}>
            <Link to="/userpage">
              <img src={issUseLogo} height={"20px"} alt="issuse logo"/>
            </Link>
          </Typography>
          <IconButton className={classes.projectButton}>
            <ProjectSelectorNew />
          </IconButton>

          <Button
            onClick={handleClick}
            variant="contained"
            className={classes.reportButton}
          >
            Create Issue
          </Button>

          {auth && (
            <div className={classes.userIcon}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={classes.accountButton}
              >
                {selectedUser + ""}
                <AccountCircle />
              </IconButton>
              <Menu
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
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent, primary"
        anchor="left"
        open={opens}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <CancelIcon style={{ color: "#f36106" }} />
            ) : (
              <CancelIcon style={{ color: "#f36106" }} />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Button onClick={handleAllIssuesClick} className={classes.button}>
            All Issues <ArrowIcon />
          </Button>
          <Button className={classes.button}>
            Assigned to me <ArrowIcon />
          </Button>
          <Button className={classes.button}>
            Reported By me <ArrowIcon />
          </Button>
          <Button className={classes.button}>
            Board <ArrowIcon />
          </Button>
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: opens,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}

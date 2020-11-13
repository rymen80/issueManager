import React from "react";
import { useHistory, useLocation,Link } from "react-router-dom";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  IconButton,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AccountCircle } from "@material-ui/icons";
import ReportIssueButton from "./ReportIssueButton";
import ProjectSelector from "./ProjectSelector";
import ProjectSelectorNew from "./ProjectSelectorNew";
import { setVisibility } from "../../../pages/User/UserPageReducer";
import { useDispatch } from "react-redux";
import issUseLogo from "../../../images/issUseLogo.png";
import {userProfile} from './UserProfile'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
    borderColor: "blue",
    border: "1px",
  },
  userIcon: {
    right: "2%",
    position: "absolute",
  },
  projectButton: {
    // position: "absolute",
    // right: "40%",
    marginLeft: "40px",
  },
  accountButton: {
    fontSize: "12px",
    borderColor: "white",
  },
  reportButton: {
    // position: "absolute",
    // right: "50%",
    marginLeft: "30px",
  },
}));

export default function NavbarUser() {
  // const [visibility, setVisibility] = useState(true);
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedUser = JSON.parse(localStorage.getItem("userauth")).username;
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const location = useLocation();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    history.push({
      pathname: "/userpage/profile",
      state: { backLocation: location.pathname, localstorageItem: "userauth" },
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    handleProfileClick();
  };

  const handleClick = () => {
    dispatch(setVisibility());
  };

  const handleSignOut = () => {
    localStorage.removeItem("userauth");
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.logo}>
          <Link to="/userpage">
              <img src={issUseLogo} height={"20px"} />
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
                {selectedUser + "  "}
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Button, Container, Paper, makeStyles } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e6e6ff",
    color: "#4049cc",
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    background: "#4049cc",
    color: "white",
    position: "absolute",
    left: "45%",
  },
  span: {
    margin: "25px",
    fontFamily: "Roboto",
  },
}));

export function UserProfile(props) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  useEffect(() => {
    const useridParam = JSON.parse(
      localStorage.getItem(props.location.state.localstorageItem)
    ).id;
    const token = JSON.parse(
      localStorage.getItem(props.location.state.localstorageItem)
    ).token;
    const getUserData = async (id) => {
      try {
        const userData = await axios.get(`/api/users/${id}`, {
          headers: { authorization: token },
        });
        setUser(userData.data);
      } catch (e) {
        throw new Error(e);
      }
    };
    getUserData(useridParam);
  }, []);

  return (
    <Container>
      <Paper elevation={3} className={classes.root}>
        <h2>User Profile</h2>
        <hr />
        <div className={classes.span}>
          <span>User Id:</span>
          <span>{user.id}</span>
        </div>
        <div className={classes.span}>
          {" "}
          <span>Username:</span>
          <span>{user.username}</span>
        </div>
        <div className={classes.span}>
          <span>Is Admin User:</span>
          <span>{user.isadmin ? "Yes" : "No"}</span>
        </div>
        <Button
          variant="container"
          color="inherit"
          href={props.location.state.backLocation}
          className={classes.button}
        >
          Back
        </Button>
      </Paper>
    </Container>
  );
}

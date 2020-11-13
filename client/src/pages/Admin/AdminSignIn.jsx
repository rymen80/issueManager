import React from "react";
import { reduxForm, Field } from "redux-form";
import { useSelector } from "react-redux";
import {
  TextField,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { setAdminToken, getUser } from "./adminReducer";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/PersonOutline";
import issUseLogo from "../../images/issUse.png";
import apiLogo from "../../images/swagger.png";
import { LoginPagesCopyright } from "../common/components/LoginPagesCopyright";

/**
 * @description Wrapper for TextField.
 * The function/component is called as redux 'FIELD' component *
 */
const TextFieldInput = ({ input, meta, label, ...custom }) => {
  console.log("FIELD COMPONENT PROPS", meta);

  return <TextField {...input} label={label} {...custom} />;
};

/**
 * @description makeStyles hook is used for styling the AdminSignIn Component.
 */
//#region Style ****** STYLE START ******
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflow: "hidden",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.6,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    top: "1%",
    marginRight: 5,
  },
  buttonBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    position: "absolute",
    top: "1%",
    borderColor: "red",
    borderStyle: "1px solid red",
  },
  avatar: {
    margin: theme.spacing(6),
    height: "60px",
    width: "40%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#4049cc",
    color: "white",
  },
}));
//#endregion ****** STYLE END ******

// *** AdminSignIn Component
const AdminSignIn = (props) => {
  const classes = useStyles();
  const { handleSubmit, history } = props;
  const st = useSelector((state) => state.admin);

  console.log(props);
  const handleSignIn = async (formValues, dispatch) => {
    console.log(formValues);

    try {
      // *** Since user is trying to login as admin.
      // *** We remove the 'userauth' item from local storage

      localStorage.removeItem("userauth");
      const res = await axios.post("/auth/signin", formValues);
      console.log(res.data);
      if (res.data.isadmin) {
        /** @summary on authentication success store the auth token in local storage         *
         */
        localStorage.setItem("adminauth", JSON.stringify(res.data));
        /**dispatch the auth token to store */
        dispatch(
          setAdminToken({
            adminauth: res.data,
            invalidLogin: false,
            authorized: true,
          })
        );
        dispatch(
          getUser({
            id: res.data.id,
            username: res.data.username,
          })
        );
        // *** Once authenticated go to adminpage
        history.push("/admin/adminpage");
      } else {
        dispatch(
          setAdminToken({
            adminauth: res.data,
            invalidLogin: false,
            authorized: false,
          })
        );
      }
    } catch (e) {
      dispatch(
        setAdminToken({
          adminauth: null,
          invalidLogin: true,
          authorized: false,
        })
      );
      // *** something's wrong: so remove the adminauth from localstorage as a security measure
      localStorage.removeItem("adminauth");
    }
  };

  /**
   * @summary Component JSX
   */
  return (
    // *** Grid Container - Contains 2 Grid Items
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/**Grid 1 - occupies half of viewport */}
      <Grid item xs={false} md={7} className={classes.image}>
        <span className="tagline">
          <h1>
            "Issues"?! No Issues with issUse<sup>&copy;</sup>
          </h1>
        </span>
      </Grid>
      {/**Grid 2 - occupies other half of viewport */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.buttonBar}>
          <Button
            variant="outlined"
            color="inherit"
            className={classes.button}
            startIcon={<PersonIcon />}
            onClick={() => {
              history.push("/");
            }}
          >
            User Sign In
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            href="/api-docs/"
            target="_blank"
            startIcon={<img src={apiLogo} height="22px" alt="api logo" />}
          >
            API DOCS
          </Button>
        </div>
        <div className={classes.paper}>
          <img src={issUseLogo} className={classes.avatar} alt="issuse logo" />
          <Typography component="h1" variant="h5">
            <span style={{ color: "#ee3311" }}>Administrator</span> Sign in
          </Typography>
          <Typography component="div">
            <span style={{ color: "#ff0134", fontSize: "6" }}>
              {st.invalidLogin ? " Invalid Login" : ""}
              {st.authorized
                ? ""
                : " You are not authorized to access admin app"}
            </span>
          </Typography>
          <form autoComplete="off" className={classes.form}>
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="username"
              autoComplete="username"
              component={TextFieldInput}
            />
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              autoComplete="password"
              type="password"
              component={TextFieldInput}
            />
            <Button
              onClick={handleSubmit(handleSignIn)}
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Administrator Sign in
            </Button>
            <Box mt={5}>
              <LoginPagesCopyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

// *** AdminSignIn component is wrapped in reduxForm
export const WrappedAdminSignIn = reduxForm({ form: "adminSignInForm" })(
  AdminSignIn
);

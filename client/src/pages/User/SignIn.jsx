import React from "react";
import axios from "axios";
import { reduxForm, Field } from "redux-form";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { setUserToken, getUser } from "./UserReducer";
import { LoginPagesCopyright } from "../common/components/LoginPagesCopyright";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";
import issUseLogo from "../../images/issUse.png";

/**
 * @description Wrapper for test field passing in props
 */
const TextFieldInput = ({ input, meta, label, ...custom }) => {
  console.log("FIELD COMPONENT PROPS", custom);
  return <TextField {...input} label={label} meta={meta} {...custom} />;
};
/**
 * @description Using Material UI hook "make styles" to format styling for elements in component
 */

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
    left: "80%",
  },
  avatar: {
    margin: theme.spacing(6),
    height: "60px",
    width: "40%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#4049cc", //"#638FBC",
    color: "white",
  },
}));
/**
 * @description Create sign in component
 */
const SignIn = (props) => {
  const classes = useStyles();
  const { handleSubmit, history } = props;
  /**
   * @description getting state for user from redux store
   */
  const st = useSelector((state) => state.user);
  /**
   * @description When signing in...
   * First: remove userauth saved in local storage
   * Second: grab form values from sign in and set new user auth to local storage
   * Third: dispatch our token and user id an username to our redux storage
   * Fourth: send user through to our /userpage
   */
  const handleSignIn = async (formValues, dispatch) => {
    try {
      localStorage.removeItem("userauth");
      const res = await axios.post("/auth/signin", formValues);
      localStorage.setItem("userauth", JSON.stringify(res.data));
      dispatch(setUserToken({ userauth: res.data, invalidLogin: false }));
      dispatch(getUser({ id: res.data.id, username: res.data.username }));
      history.push("/userpage");
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <span className="tagline">
          <h1>
            "Issues"?! No Issues with issUse<sup>&copy;</sup>
          </h1>
        </span>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Button
          variant="outlined"
          color="inherit"
          className={classes.button}
          startIcon={<SettingsIcon />}
          onClick={() => {
            history.push("/admin");
          }}
        >
          Admin
        </Button>
        <div className={classes.paper}>
          <img src={issUseLogo} className={classes.avatar} />
          <Typography component="h1" variant="h5">
            <span style={{ color: "#4049cc" }}>User</span> Sign in
          </Typography>
          <Typography component="div">
            <span style={{ color: "#ff0134", fontSize: "6" }}>
              {st.invalidLogin ? " Invalid Login" : ""}
              {/* {st.authorized
                ? ""
                : " Wrong username and password"} */}
            </span>
          </Typography>
          <form noValidate autoComplete="off" className={classes.form}>
            {/* USERNAME FIELD */}
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
            {/* PASSWORD FIELD */}
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              autoComplete="password"
              type="password"
              name="password"
              component={TextFieldInput}
            />
            {/* SUBMIT BUTTON */}
            <Button
              onClick={handleSubmit(handleSignIn)}
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              User Sign in
            </Button>
            {/* COPYRIGHT COMPONENT */}
            <Box mt={5}>
              <LoginPagesCopyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export const WrappedSignIn = reduxForm({ form: "signInForm" })(SignIn);

import React from "react";
import { reduxForm, Field } from "redux-form";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { setAdminToken } from "./adminReducer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import issUseLogo from "../../images/issUse.png";
import PersonIcon from "@material-ui/icons/PersonOutline";
import { LoginPagesCopyright } from "../common/components/LoginPagesCopyright";
import { Hidden } from "@material-ui/core";

const TextFieldInput = ({ input, meta, label, ...custom }) => {
  console.log("FIELD COMPONENT PROPS", meta);

  return <TextField {...input} label={label} {...custom} />;
};

// *** Field Validations To Be defined here :TBD


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
    left: "70%",
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

const AdminSignIn = (props) => {
  const classes = useStyles();
  const { handleSubmit, history } = props;  
  const st = useSelector((state) => state.admin);

  console.log(props);
  const handleSignIn = async (formValues, dispatch) => {
    console.log(formValues);

    try {
      // *** Since you are trying to login as admin. We remove the 'userauth' item from local storage
      localStorage.removeItem("userauth");
      const res = await axios.post("/auth/signin", formValues);
      console.log(res.data);
      if (res.data.isadmin) {
        localStorage.setItem("adminauth", JSON.stringify(res.data));
        dispatch(
          setAdminToken({
            adminauth: res.data,
            invalidLogin: false,
            authorized: true,
          })
        );
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
      localStorage.removeItem("adminauth");
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
          startIcon={<PersonIcon />}
          onClick={() => {
            history.push("/");
          }}
        >
          User Sign In
        </Button>
        <div className={classes.paper}>
          <img src={issUseLogo} className={classes.avatar} />
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
              name="password"
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

export const WrappedAdminSignIn = reduxForm({ form: "adminSignInForm" })(
  AdminSignIn
);

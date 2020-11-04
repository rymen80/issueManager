import React from "react";
import { reduxForm, Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { setViewerToken } from "../ViewerReducer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import issUseLogo from '../../../images/issUse.png';
import SettingsIcon from '@material-ui/icons/Settings';
import {LoginPagesCopyright} from '../../../pages/common/components/LoginPagesCopyright'



const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: .6,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(8),
    
    width: "80%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#638FBC',
    color: 'white',
  },
}));

// What Redux form does for us
// It will write the functions for updating form state
// It will also write state to determine the current state of each field
// It also gives us a function for getting the values out of the input
// and then putting it in out submit function

//what handleSubmit will do is pass the forms Values as the first parameter
// handleSubmit also preventsDefault for us right away
// to the function that it's calling
const SignIn = (props) => {
  const classes = useStyles();
  const { handleSubmit, history } = props;
  // const history = useHistory();

  console.log(props);
  const handleSignIn = async (formValues, dispatch) => {
    console.log(formValues);
    //{ username: 'Your enterereduseRName', password: 'your password' }
    try {
      const res = await axios.post("/auth/signin", formValues);
      localStorage.setItem("token", res.data);
      dispatch(setViewerToken(res.data));
      history.push("/users");
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Button
        variant="outlined"
        color="#ff9961"
        className={classes.button}
        startIcon={<SettingsIcon />}
        onClick={() => {
          history.push("/adminsignin")}}
          style={{right:"0px"}}
          
      >
        Admin
      </Button>
        <div className={classes.paper}>
        
            <img src={issUseLogo} className={classes.avatar}/>
        
         
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form noValidate autoComplete="off" className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="username"
              autoComplete="username"
              autoFoucs
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              autoComplete="password"
            />
            <Button
              onClick={handleSubmit(handleSignIn)}
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign in
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

export const WrappedSignIn = reduxForm({ form: "signInForm" })(SignIn);

import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { reduxForm, Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const TextFieldInput = ({ input, props, meta, label, ...custom }) => {
  console.log("FIELD COMPONENT PROPS", meta);

  return <TextField {...input} label={label} {...custom} {...props} />;
};


/**
 * 
 * @summary CreateUser Form
 * @description Password encryption is handled at backend/database layer
 */
function CreateUser(props) {
  const classes = useStyles();
  const { handleSubmit, history } = props;

  const handleFormSubmit = async (formValues, dispatch) => {
    const auth = JSON.parse(localStorage.getItem("adminauth"));

    try {
      const res = await axios.post(
        "/api/users",
        {
          username: formValues.username,
          password: formValues.password,
          firstname: formValues.firstname || "",
          lastname: formValues.lastname || "",
          phone: formValues.phone || "",
        },
        {
          headers: { authorization: auth.token },
        }
      );
      history.push("/admin/adminpage");
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <form
            autoComplete="off"
            className={classes.form}
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="User Name"
              autoComplete="username"
              component={TextFieldInput}
            />
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              component={TextFieldInput}
            />
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              id="firstname"
              name="firstname"
              label="First Name"
              autoComplete="firstname"
              component={TextFieldInput}
            />
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              id="lastname"
              name="lastname"
              label="Last Name"
              autoComplete="lastname"
              component={TextFieldInput}
            />
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              autoComplete="phone"
              component={TextFieldInput}
            />
            <Button
              onClick={handleSubmit(handleFormSubmit)}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Create User
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export const WrappedCreateUser = reduxForm({ form: "createUserForm" })(
  CreateUser
);

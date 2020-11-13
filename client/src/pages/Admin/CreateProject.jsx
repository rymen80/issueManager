import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { reduxForm, Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {useSelector} from 'react-redux';
import {getAllProjects} from './adminPageReducer';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const TextFieldInput = ({ input,props, meta, label, ...custom }) => {
  console.log("FIELD COMPONENT PROPS", meta);

  return <TextField {...input} label={label} {...custom} {...props}/>;
};

export default function CreateProject(props) {
  const classes = useStyles();
  const { handleSubmit, history } = props;
  const st = useSelector(state=>state.admin);

  // const adminPageState = useSelector(state=>state.adminPage);

  const handleFormSubmit = async (formValues, dispatch) => {
    // console.log(formValues);
    formValues.created_by=st.adminauth.id;
    // console.log(st.adminauth.id);
    try {
      const res = await axios.post("/api/projects", formValues);
      history.push("/admin/adminpage/projects");
      dispatch(getAllProjects());
    }catch(e){
      throw new Error(e)
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="projectname"
              name="name"
              label="Project Name"
              autoComplete="name"
              component={TextFieldInput}
            />
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="projectkey"
              name="key"
              label="Key"
              autoComplete="key"
              component={TextFieldInput}
            />
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              name="description"
              label="description"
              autoComplete="project description"
              component={TextFieldInput}
              multiLine={true}
            />            
            <Button
              // onClick={handleSubmit(handleFormSubmit)}
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Create Project
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export const WrappedCreateProject = reduxForm({ form: "createProjectForm" })(
  CreateProject
);

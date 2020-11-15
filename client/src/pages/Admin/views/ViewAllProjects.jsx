import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { reduxForm, Field, reset } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useSelector, useDispatch, connect } from "react-redux";
import { setSelectedProject } from "../adminPageReducer";
import { border, borderColor } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  submit: {
    // backgroundColor: "#3f51b5",
    // color: "#228adc",
    margin: "10px",
  },
  grid: {
    border: 1,
    borderColor: "#228adc",
    boxSizing: "border-box",
    padding: 10,
  },
}));

const TextFieldInput = ({ input, props, meta, label, ...custom }) => {
  console.log("FIELD COMPONENT PROPS", meta);

  return <TextField {...input} label={label} {...custom} {...props} />;
};

const columns = [
  { field: "id", headerName: "#", width: 50 },
  { field: "project_id", headerName: "ID", width: 50 },
  { field: "project_name", headerName: "Name", width: 160 },
  { field: "project_key", headerName: "Key", width: 100 },
  { field: "created_date", headerName: "Created Date", width: 220 },
  { field: "description", width: 0, sortable: false },
  // { field: 'lastName', headerName: 'Last name', width: 130 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
];

export default function ViewAllProjects() {
  let selectedProj;
  const classes = useStyles();
  const adminPageState = useSelector((state) => state.adminPage);

  const dispatch = useDispatch(adminPageState);
  // *** Following is not used but retained to refresh component
  const st = useSelector((state) => state.adminPage);
  const [projects, setProjects] = useState([]);
  // const [project, setSelectedProject] = useState({});

  let rows;
  useEffect(() => {
    async function getProjects() {
      const auth = JSON.parse(localStorage.getItem("adminauth"));
      try {
        const res = await axios.get(`/api/projects?userid=${auth.id}`);
        setProjects(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getProjects();
  }, []);

  // let projects = await getProjects();
  let i = 1;
  rows = projects.map((item) => ({ ...item, id: i++ }));
  // rows = projects;

  const rowSelection = (param) => {
    selectedProj = param.data;
    console.log(selectedProj);
    dispatch(setSelectedProject(selectedProj));
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={false} md={7}>
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={30}
              onRowSelected={rowSelection}
              disableMultipleSelection
              hideFooterSelectedRowCount
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={8} md={5} elevation={6} className={classes.grid}>
          <WrappedEditProjectForm />
        </Grid>
      </Grid>
    </Container>
  );
}

function ViewUpdateForm(props) {
  const classes = useStyles();
  const { handleSubmit, history } = props;
  const adminPageState = useSelector((state) => state.adminPage);
  const dispatch = useDispatch(adminPageState);
  const { selectedProject } = useSelector((state) => state.adminPage);
  // const handleFormSubmit = async (formValues, dispatch) => {};
  const handleDeleteProject = (formValues) => {
    const auth = JSON.parse(localStorage.getItem("adminauth"));
    try {
      const res = axios
        .delete(`/api/projects/${selectedProject.project_id}`)
        .then((res) => {
          dispatch(reset("WrappedEditProjectForm"));
          dispatch(setSelectedProject({}));
          window.location.reload();
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateProject = (formValues) => {
    console.log(formValues);
    const auth = JSON.parse(localStorage.getItem("adminauth"));
    try {
      const res = axios
        .patch(`/api/projects`,{
          name:formValues.project_name, description:formValues.project_description,projectId:formValues.project_id
        })
        .then((res) => {
          dispatch(reset("WrappedEditProjectForm"));
          dispatch(setSelectedProject({}));
          window.location.reload();
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      autoComplete="off"
      className={classes.form}
      // onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="project_name"
        name="project_name"
        label="Project Name"
        autoComplete="name"
        component={TextFieldInput}
      />
      <Field
        variant="outlined"
        margin="normal"
        // required
        fullWidth
        id="project_key"
        name="project_key"
        label="Key"
        autoComplete="key"
        component={TextFieldInput}
        disabled
      />
      <div>* Key Cannot be updated</div>
      <Field
        variant="outlined"
        margin="normal"
        // required
        fullWidth
        id="project_description"
        name="project_description"
        label="description"
        autoComplete="project description"
        component={TextFieldInput}
        multiLine={true}
      />
      <Button
        // onClick={handleSubmit(handleFormSubmit)}
        type="submit"
        // fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit(handleUpdateProject)}
      >
        Update Project
      </Button>
      <Button
        onClick={handleDeleteProject}
        // type="submit"
        // fullWidth
        variant="contained"
        // color="secondary"
        color="primary"
        className={classes.submit}
      >
        Delete Project
      </Button>
    </form>
  );
}

let WrappedEditProjectForm = reduxForm({
  form: "editProjectForm",
  enableReinitialize: true,
})(ViewUpdateForm);

// You have to connect() to any reducers that you wish to connect to yourself
WrappedEditProjectForm = connect(
  (state) => ({
    initialValues: state.adminPage.selectedProject, // pull initial values from account reducer
  }),
  { load: setSelectedProject } // bind account loading action creator
)(WrappedEditProjectForm);

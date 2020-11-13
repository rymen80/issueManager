import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import { setVisibility } from "../../../pages/User/UserPageReducer";
import { useDispatch, useSelector } from "react-redux";
// import {projectResult } from './ProjectSelector'
import axios from "axios";

let projectResult;
let projectId;
let usersFromProject;
//axios requests

const projectRequest = axios.get("/api/projects").then((res) => {
  projectResult = res.data;
}).catch( (e) => {
  console.log(e);
});;
const tokenLocalStorage = JSON.parse(localStorage.getItem('userauth')).token;

const usersInProject = axios.get(`/api/users?projectid=${project}`, {
  headers: {
    authorization: tokenLocalStorage,
  },
}).then((res) => {
  usersFromProject = res.data;
  console.log("USERS", res.data[0].id);
}).catch((e) => {
  console.log(e);
});

const resolutionRequet = axios.get('/api/resolutions',{
  headers: {
    authorization: tokenLocalStorage,
  },
}).then((res) => {
  console.log("RESOLUTION", res.data)
}).catch((e) => {
  console.log(e);
});

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    "project",
    "priority",
    "resolution",
    "title",
    "description",
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    fullWidth
    {...input}
    {...custom}
  />
);
const renderDescriptionField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    id={label}
    name="description"
    label="Description"
    multiline
    error={touched && invalid}
    helperText={touched && error}
    fullWidth
    rows={8}
    defaultValue="Description of Issue"
    variant="outlined"
    {...input}
    {...custom}
  />
);

const useStyles = makeStyles((theme) => ({
  root: {
    border: ".1px solid #00000026",
    borderRadius: 5,
    width: "75%",
    margin: "0 auto",
    boxShadow: " 3px 3px 5px 6px #ccc",
    position: "absolute",
    left: "10%",
    background: "white",
  },
  formContents: {
    margin: theme.spacing(3),
  },
  borderBottom: {
    borderBottom: ".5px solid #00000026",
  },
  formControl: {
    minWidth: 120,
  },
  header: {
    fontFamily: "Roboto",
    fontWeight: "lighter",
  },
  title: {
    width: "80%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    margin: "20px 0",
    background: "#638FBC",
    color: "white",
  },
  description: {
    margin: "40px 0",
  },
  dropdowns: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const CreateIssueForm = (props) => {
  const userauth = useSelector((state) => state.user.userauth.token);
  const dispatch = useDispatch();
  const style = useStyles();
  const { handleSubmit, pristine, reset, submitting } = props;
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("");
  const [resolution, setResolution] = useState("");
  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  let assignedValue;

  projectId = project;

  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleResolutionChange = (event) => {
    setResolution(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAssignedChange = (event) => {
    assignedValue = event.target.value;
  };
  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };
  

  const handleClick = async (e) => {
    e.preventDefault();
    await axios.post(
      "api/issues",
      {
        summary: title, //done
        description: description, //done
        assigned_to: 5, //hardcoded for now, can update once admin auth is removed from request
        status: 1, //done
        priority: priority, //done
        project_id: project, //done
        resolution_id: resolution, //hard coded for now since there is no route
        label: label, //hard coded, no route
      },
      {
        headers: {
          authorization: userauth,
        },
      }
    );

    dispatch(setVisibility());
  };

  return (
    <form className={style.root} onSubmit={handleSubmit}>
      <div className={style.formContents}>
        <div className={style.borderBottom}>
          <h1 className={style.header}>Create Issue</h1>
        </div>
        <div className={style.dropdowns}>
          <FormControl className={style.formControl}>
            <InputLabel>Project</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleProjectChange}
              value={project}
              name="project"
            >
              {projectResult.map((i) => (
                <MenuItem value={i.project_id}>{i.project_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={style.formControl}>
            <InputLabel>Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              name="priority"
              onChange={handlePriorityChange}
            >
              <MenuItem value="P0">P0</MenuItem>
              <MenuItem value="P1">P1</MenuItem>
              <MenuItem value="P2">P2</MenuItem>
              <MenuItem value="P3">P3</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={style.formControl}>
            <InputLabel>Resolution</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={resolution}
              name="resolution"
              onChange={handleResolutionChange}
            >
              <MenuItem value="1">Not A Defect</MenuItem>
              <MenuItem value="2">In-Fix</MenuItem>
              <MenuItem value="3">Fixed</MenuItem>
              <MenuItem value="4">Won't Fix</MenuItem>
              <MenuItem value="5">Done</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={style.formControl}>
            <InputLabel>Assigned To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={assignedValue}
              name="assigned"
              onChange={handleAssignedChange}
            >
             {usersFromProject.map((i) => (
                <MenuItem value={i.id}>{i.username}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={style.formControl}>
            <InputLabel>Label</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={label}
              name="label"
              onChange={handleLabelChange}
            >
              <MenuItem value="1">Documentation</MenuItem>
              <MenuItem value="2">Bug</MenuItem>
              <MenuItem value="3">Enhancement</MenuItem>
              <MenuItem value="4">Project Task</MenuItem>
              <MenuItem value="5">Feature</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={style.title}>
          <Field
            name="title"
            component={renderTextField}
            label="Title"
            value="title"
            onChange={handleTitleChange}
          />
        </div>
        <div className={style.description}>
          <Field
            name="description"
            label="Description"
            component={renderDescriptionField}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className={style.buttonContainer}>
          <Button
            className={style.button}
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </Button>
          <Button
            type="submit"
            variant="contained"
            className={style.button}
            onClick={handleClick}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "MaterialUiForm", // a unique identifier for this form
  validate,
})(CreateIssueForm);

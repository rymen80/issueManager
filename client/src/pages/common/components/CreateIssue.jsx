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
import { useDispatch } from "react-redux";
import axios from "axios";

let projectsForm = [];

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
  const dispatch = useDispatch();
  const style = useStyles();
  const { handleSubmit, pristine, reset, submitting, classes } = props;
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("");
  const [resolution, setResolution] = useState("");

  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleResolutionChange = (event) => {
    setResolution(event.target.value);
  };

  const handleClick = () => {
    dispatch(setVisibility());
  };

  useEffect(async () => {
    let projectResult = await axios.get("/api/projects");
    const projects = projectResult.data.map((i) => i.project_name);
    projects.push(projectsForm);
  }, []);
  console.log(projectsForm);
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
              value={project}
              name="project"
              onChange={handleProjectChange}
            >
              {console.log("PROJECT___", projectsForm)}
              {projectsForm.map((name) => (
                <MenuItem>{name}</MenuItem>
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
              <MenuItem>P0</MenuItem>
              <MenuItem>P1</MenuItem>
              <MenuItem>P2</MenuItem>
              <MenuItem>P3</MenuItem>
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
              <MenuItem>Not A Defect</MenuItem>
              <MenuItem>In-Fix</MenuItem>
              <MenuItem>Fixed</MenuItem>
              <MenuItem>Won't Fix</MenuItem>
              <MenuItem>Done</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={style.title}>
          <Field name="title" component={renderTextField} label="Title" />
        </div>
        <div className={style.description}>
          <Field
            name="description"
            label="Description"
            component={renderDescriptionField}
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

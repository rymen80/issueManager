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

 //axios requests


 axios.get('/api/projects')
    .then((res) => {
    //  let name = res.data.map(i => i.project_name);
    //  let id = res.data.map(i => i.project_id);
    //  projectName.push(name)
    //  projectId.push(id)
    projectResult = res.data;
    })
    
let projectId;
let users;
// axios.get(`/api/users?projectid=1`)
// .then((res) => {
//  users = res.data;
//  console.log("USERS", users)
// })
    

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
  const userauth= useSelector(state=>state.user.userauth.token)
  const dispatch = useDispatch();
  const style = useStyles();
  const { handleSubmit, pristine, reset, submitting} = props;
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("");
  const [resolution, setResolution] = useState("");
  let titleValue;
  let descriptionValue;
  let assignedValue;
  let labelValue;

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
    titleValue = event.target.value;
  }
  const handleDescriptionChange = (event) => {
    descriptionValue = event.target.value;
  }

  const handleAssignedChange =(event) => {
    assignedValue = event.target.value;
  }
  const handleLabelChange =(event) => {
    labelValue = event.target.value;
   
  }
  const handleClick = async (e) => {
    e.preventDefault();
    await axios.post("api/issues", 
      {
        "summary": titleValue,//not showing up...
        "description": descriptionValue, //done
        "assigned_to": 5,
        "status": 1, //done
        "priority": priority, //done
        "project_id": project, //done
        "resolution_id": resolution, //hard coded for now since there is no route
        "label": 2,
      },
      {headers: {
        'authorization': userauth
      }}
    )
    
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
              {console.log('PROJECTS', projectResult)}
              {projectResult.map(i => (
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
              <MenuItem value='P0'>P0</MenuItem>
              <MenuItem value='P1'>P1</MenuItem>
              <MenuItem value='P2'>P2</MenuItem>
              <MenuItem value='P3'>P3</MenuItem>
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
              name="assigned_to"
              onChange={handleAssignedChange}
            >
              <MenuItem value="Me">Me</MenuItem>
             
            </Select>
          </FormControl>
          <FormControl className={style.formControl}>
            <InputLabel>Label</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={labelValue}
              name="label"
              onChange={handleLabelChange}
            >
              <MenuItem value="Me">Me</MenuItem>
             
            </Select>
          </FormControl>
        </div>
        <div className={style.title}>
          <Field name="title" component={renderTextField} label="Title" value="title" onChange={handleTitleChange}/>
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

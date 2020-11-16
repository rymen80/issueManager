import axios from "axios";
import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";


/**
 * @description these variables hold information from axios requests, declared outside of
 * component to be used universally
 */
let projectResult;
let resolutionValues = [];
let usersFromProject = [];

/**
 * @description grabs the auth token from local storage to be use for axios calls. This token
 * gets set when user logs in
 */
const tokenLocalStorage = localStorage.getItem("userauth")
  ? JSON.parse(localStorage.getItem("userauth")).token
  : null;

/**
 * @description Project list and Resolution list requests with axios
 */

const projectRequest = axios
  .get(`/api/projects`)
  .then((res) => {
    projectResult = res.data;
  })
  .catch((e) => {
    console.log(e);
  });

const resolutionRequet = axios
  .get("/api/resolutions", {
    headers: {
      authorization: tokenLocalStorage,
    },
  })
  .then((res) => {
    resolutionValues = res.data;
    console.log("RESOLUTION", res.data);
  })
  .catch((e) => {
    console.log(e);
  });

/**
 * @description Validate makes the form fields all required
 */

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    "project",
    "priority",
    "resolution",
    "title",
    "description",
    "resolution",
    "assigned",
    "label",
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

/**
 * @description Makes a text field to use for our Title on our form
 */

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

/**
 * @description Makes a text field to use for our Description on our form
 */

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

/**
 * @description Using makeStyles from material UI to style components in form
 * We then assign to const style in our form component
 * To use styles in form apply className to elements... ex. className={style.root}
 */

const useStyles = makeStyles((theme) => ({
  root: {
    border: ".1px solid #00000026",
    borderRadius: 5,
    width: "75%",
    margin: "0 auto",
    boxShadow: " 3px 3px 5px 6px #ccc",
    // position: "absolute",
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
    background: "#3f51b5",
    color: "white",
  },
  description: {
    margin: "40px 0",
  },
  dropdowns: {
    display: "flex",
    justifyContent: "space-between",
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: ".5px solid #00000026",
  },
  cancel: {
    cursor: "pointer",
    marginBottom: '10px',
    background: "#EE3311",
    color: "white",
  },
}));

/**
 * @description Declaration of CreateIssueForm component, will be used to create our
 * form and will export to be used on user page
 */

const CreateIssueForm = (props) => {
  /**
   * @description
   * userauth: grabbing state of user authentication from our redux store
   * props are used for help with submitting form and in use with our clear button on form
   */
  const history = useHistory();
  const userauth = useSelector((state) => state.user.userauth.token);
  const { handleSubmit, pristine, reset, submitting } = props;
  const style = useStyles();
  /**
   * @description setting pieces of state that will be used in this form
   */
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("");
  const [resolution, setResolution] = useState("");
  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigned, setAssigned] = useState("");

  /**
   * @description Handle change functions set our state when dropdowns have a selection
   */
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
    setAssigned(event.target.value);
  };
  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };
  /**
   * @description Axios request is placed in useEffect so that it can run every time user selects a project.
   * Makes it so our "Assigned to" dropdown can updated with users for the selected project
   */
  useEffect(() => {
    console.log(project);
    axios
      .get(`/api/users?projectid=${project}`, {
        headers: {
          authorization: tokenLocalStorage,
        },
      })
      .then((res) => {
        usersFromProject = res.data;
        console.log("USERS", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [handleProjectChange]);

  /**
   * @description Submit button is clicked, "handClick" is called and form data is sent to mySql database
   */
  const handleClick = async (e) => {
    e.preventDefault();
    await axios.post(
      "/api/issues",
      {
        summary: title,
        description: description,
        assigned_to: assigned,
        status: 1,
        priority: priority,
        project_id: project,
        resolution_id: resolution,
        label: label,
      },
      {
        headers: {
          authorization: userauth,
        },
      }
    );
 /**
   * @description dispatch(setVisibility()) this changes the state of visibility in our redux store
   * When applied to elements allows create issue form to open and close
   */
    history.push('/userpage')
  };
  
  const handleClose = () => {
    history.push('/userpage')
  };

  return (
    /**
     * @description Make of the form using Material UI components imported above
     */
    <form className={style.root} onSubmit={handleSubmit}>
      <div className={style.formContents}>
        <div className={style.headerContainer}>
          <h1 className={style.header}>Create Issue</h1>
          <Button className={style.cancel} onClick={handleClose}>Cancel</Button>
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
              {console.log(resolutionValues[0].resolution_name)}
              {resolutionValues.map((i) => (
                <MenuItem value={i.resolution_id}>{i.resolution_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={style.formControl}>
            <InputLabel>Assigned To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={assigned}
              name="assigned"
              onChange={handleAssignedChange}
            >
              {usersFromProject.map((i) => (
                <MenuItem value={i.id}>{i.username}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* hard coded labels for now, no route made */}
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

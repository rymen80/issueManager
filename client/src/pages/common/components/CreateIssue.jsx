import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import { setVisibility } from "../../../pages/User/UserPageReducer";
import { useDispatch } from "react-redux";

const validate = (values) => {
  const errors = {};
  const requiredFields = ["project", "title", "description"];
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
}));

const CreateIssueForm = (props) => {
  const dispatch = useDispatch();
  const style = useStyles();
  const { handleSubmit, pristine, reset, submitting, classes } = props;
  const [project, setProject] = useState("");

  const handleChange = (event) => {
    setProject(event.target.value);
  };

  const handleClick = () => {
    dispatch(setVisibility());
  };
  return (
    <form className={style.root} onSubmit={handleSubmit}>
      <div className={style.formContents}>
        <div className={style.borderBottom}>
          <h1>Create Issue</h1>
        </div>
        <div>
          <FormControl className={style.formControl}>
            <InputLabel>Project</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={project}
              name="project"
              onChange={handleChange}
            >
              <MenuItem value={1}>Project 1</MenuItem>
              <MenuItem value={2}>Project 2</MenuItem>
              <MenuItem value={3}>Project 3</MenuItem>
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

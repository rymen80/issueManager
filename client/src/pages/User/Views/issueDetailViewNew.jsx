import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch, connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { reduxForm, Field, reset } from "redux-form";
import { makeStyles } from "@material-ui/core/styles";
import {
  setGridSelectedIssue,
  setSelectedProject,
  setIssues,
} from "../UserPageReducer";
import Button from "@material-ui/core/Button";
// import Select from "@material-ui/core/Select";
import { useParams } from "react-router-dom";




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
    marginLeft: "20px",
    boxProps: {
      bgcolor: "blue",
      borderColor: "blue",
    },
  },
}));

const TextFieldInput = ({ input, props, meta, label, ...custom }) => {
  console.log("FIELD COMPONENT PROPS", meta);

  return <TextField {...input} label={label} {...custom} {...props} />;
};

// *** For future use
// const WrappedSelect = ({ input, options, name, id, value }) => {
  // return (
    // <Select {...input} name={name} value={value} options={options} id={id} />
  // );
// };

// *** For Future use
// const RenderSelectInput = ({ input, options, name, id }) => (
  // <Select {...input} name={name} options={options} id={id} />
// );

const columns = [
  { field: "id", headerName: "ID", width: 60 },
  { field: "issue_key", headerName: "KEY", width: 70 },
  // { field: "summary", headerName: "Title", width: 125 },
  // { field: "reported_by", headerName: "Reported By", width: 125 },
  { field: "assigned_to", headerName: "Assigned To", width: 115 },
  { field: "priority", headerName: "Priority", width: 90 },
  { field: "status", headerName: "Status", width: 90 },
  { field: "label", headerName: "Label", width: 115 },
  { field: "resolution", headerName: "Resolution", width: 115 },

];
const priorities = [
  { value: "P0", label: "P0" },
  { value: "P1", label: "P1" },
  { value: "P2", label: "P2" },
  { value: "P3", label: "P3" },
];

export default function ViewEditIssues({match}) {
  const classes = useStyles();
  let selectedIssue;
  let projectId = useSelector(
    (state) => state.userPage.selectedProject.project_id
  );
  let projectChange = useSelector((state) => state.userPage.selectedProject);
  const userauth = useSelector((state) => state.user.userauth.token);
  const loggedUserId = useSelector((state) => state.user.userauth.id);
  const dispatch = useDispatch();
  const [project, setSelectedProject] = useState({});

  // = [...st.selectedProject];

  console.log("PROJECT", project);

  useEffect(() => {
    const getData = async () => {
      try {
        /** @summary Get only those projects to which user belong */

        const issuesRequest = await axios.get(
          `/api/issues?projectid=${projectId}`,
          {
            headers: {
              authorization: userauth,
            },
          }
        );
        console.log("ISSUES", issuesRequest.data);

        //save all the projects from get request to issues

        dispatch(setIssues(issuesRequest.data));
      } catch (e) {
        throw new Error(e);
      }
    };
    getData();
  }, [projectId]);
  let issues = useSelector((state) => state.userPage.issues);

  // FILTER HAPPENS HERE
  switch(match.params.allissues){
    
    case 'assigned':
      issues = issues.filter(issue=>issue.assigned_to.id===loggedUserId);
      break;
    case 'reported':
      issues = issues.filter(issue=>issue.reported_by.id===loggedUserId);
      break;
  }
  let i = 1;
  issues = issues.map((item) => ({
    ...item,
    id: i++,
    assigned_to: item.assigned_to.value,
    status: item.status.value,
    label: item.label.value,
    resolution: item.resolution.value,
  }));
  
  const rows= issues;
  
 
  const rowSelection = (param) => {
    selectedIssue = param.data;
    console.log(selectedIssue);
    dispatch(setGridSelectedIssue(selectedIssue));
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={false} sm={6}>
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
          <div style={{ fontSize: "10", color: "purple" }}>
            This is v1.0 of IssueUpdate Form. We Put many restrictions in this
            version.
          </div>
          <WrappedEditIssueForm />
        </Grid>
      </Grid>
    </Container>
  );
}

function IssueUpdateForm(props) {
  const classes = useStyles();
  const { handleSubmit } = props;
  const userPageState = useSelector((state) => state.userPage);
  const dispatch = useDispatch(userPageState);
  // const { selectedIssue } = useSelector((state) => state.userPage);

  const handleUpdateIssue = (formValues) => {
    console.log(formValues);
    try {
      const res = axios
        .patch(`/api/issues`, {
          name: formValues.summary,
          description: formValues.description,
          assignedTo: formValues.assigned_to,
          status: formValues.status,
          priority: formValues.priority,
          resolution: formValues.resolution_id,
          issueId: formValues.issue_id,
        })
        .then((res) => {
          dispatch(reset("IssueUpdateForm"));
          dispatch(setGridSelectedIssue({}));
          window.location.reload();
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form autoComplete="off" className={classes.form}>
      <Field
        variant="outlined"
        margin="normal"
        
        fullWidth
        id="issue_key"
        name="issue_key"
        label="Issue Key"
        autoComplete="issue_id"
        component={TextFieldInput}
        
        disabled
      />
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="summary"
        name="summary"
        label="Summary"
        autoComplete="name"
        component={TextFieldInput}
      />
      <Field
        variant="outlined"
        margin="normal"
        // required
        fullWidth
        id="description"
        name="description"
        label="Description"
        autoComplete="Description"
        component={TextFieldInput}        
        multiLine
        rowsMax={6}
      />
      <Field
        variant="outlined"
        margin="normal"        
        fullWidth
        id="assigned_to"
        name="assigned_to"
        label="Assigned to"
        autoComplete="assigned_to"
        component={TextFieldInput}        
        disabled
      />

      <Field
        variant="outlined"
        margin="normal"        
        fullWidth
        id="status"
        name="status"
        label="Status"
        autoComplete="status"
        component={TextFieldInput}
        disabled
      />

      <Field
        variant="outlined"
        margin="normal"
        
        fullWidth
        id="priority"
        name="priority"
        label="Priority"
        autoComplete="priority"
        component={TextFieldInput}
        disabled        
      />

      <Field
        variant="outlined"
        margin="normal"        
        fullWidth
        id="resolution"
        name="resolution"
        label="Resolution"
        autoComplete="resolution"
        component={TextFieldInput}
        disabled
      />      

      <Button
        // onClick={handleSubmit(handleFormSubmit)}
        type="submit"
     
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit(handleUpdateIssue)}
      >
        Update Issue
      </Button>
    </form>
  );
}
let WrappedEditIssueForm = reduxForm({
  form: "editIssueForm",
  enableReinitialize: true,
})(IssueUpdateForm);

// You have to connect() to any reducers that you wish to connect to yourself
WrappedEditIssueForm = connect(
  (state) => ({
    initialValues: state.userPage.gridSelectedIssue, // pull initial values from account reducer
  }),
  { load: setGridSelectedIssue } // bind account loading action creator
)(WrappedEditIssueForm);

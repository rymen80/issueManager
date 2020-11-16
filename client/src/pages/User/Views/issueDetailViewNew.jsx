import React,{useState,useEffect} from  'react'
import { DataGrid } from '@material-ui/data-grid';
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch, connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { reduxForm, Field, reset } from "redux-form";
import {makeStyles} from "@material-ui/core/styles";
import {setGridSelectedIssue,setSelectedProject,setIssues} from "../UserPageReducer";
import Button from "@material-ui/core/Button";
import { useParams } from 'react-router-dom'

// import {useState} from 'react-router-dom'

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
  { field: "id", headerName: "ID", width: 125 },
  { field: "issue_key", headerName: "KEY", width: 125 },
  // { field: "summary", headerName: "Title", width: 125 },
  // { field: "reported_by", headerName: "Reported By", width: 125 },
  // { field: "assigned_to", headerName: "Assigned To", width: 125 },
  // { field: "priority", headerName: "Priority", width: 115 },
  // { field: "status", headerName: "Status", width: 115 },

  // { field: 'lastName', headerName: 'Last name', width: 130 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
];

export default function ViewEditIssues() {
  const classes = useStyles();
  let selectedIssue;
  let projectId = useSelector(
    (state) => state.userPage.selectedProject.project_id
  );
  let projectChange = useSelector((state) => state.userPage.selectedProject);
  const userauth = useSelector((state) => state.user.userauth.token);
  const dispatch = useDispatch();
  const [project,setSelectedProject]=useState({});


  // = [...st.selectedProject];


  console.log("PROJECT", project)



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
          })
            console.log("ISSUES", issuesRequest.data)



      //save all the projects from get request to issues


        dispatch(setIssues(issuesRequest.data))

      } catch (e) {
        throw new Error(e);
      }
    };
    getData();
  }, [projectId]);
  let issues= useSelector((state) => state.userPage.issues);
  let i = 1;
  issues=issues.map((item) => ({ ...item, id: i++ }));
    
  const rows=issues;
  const rowSelection =(param)=>{
    selectedIssue=param.data;
    console.log(selectedIssue);
    dispatch(setGridSelectedIssue(selectedIssue));
  };

    return (
      <Container>
      <Grid container>
        <Grid item xs={false} sm={4}>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={30} onRowSelected={rowSelection} disableMultipleSelection hideFooterSelectedRowCount/>
        </div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} elevation={6} className={classes.grid}>
          <div>HERE</div>
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
          .patch(`/api/issues`,{
            name:formValues.summary, description:formValues.description, assignedTo:formValues.assigned_to, status:formValues.status, priority:formValues.priority, resolution:formValues.resolution_id, issueId:formValues.issue_id
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
        <form
            autoComplete="off"
            className={classes.form}

        >
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
              disabled
          />
          <Field
              variant="outlined"
              margin="normal"
              // required
              fullWidth
              id="assigned_to"
              name="assigned_to"
              label="Assigned to"
              autoComplete="assigned_to"
              component={TextFieldInput}
              multiLine={true}
          />

          <Field
              variant="outlined"
              margin="normal"
              // required
              fullWidth
              id="status"
              name="status"
              label="Status"
              autoComplete="status"
              component={TextFieldInput}
              multiLine={true}
          />
          <Field
              variant="outlined"
              margin="normal"
              // required
              fullWidth
              id="priority"
              name="priority"
              label="Priority"
              autoComplete="priority"
              component={TextFieldInput}
              multiLine={true}
          />
          <Field
              variant="outlined"
              margin="normal"
              // required
              fullWidth
              id="resolution"
              name="resolution"
              label="Resolution"
              autoComplete="resolution"
              component={TextFieldInput}
              multiLine={true}
          />
          <Field
              variant="outlined"
              margin="normal"
              // required
              fullWidth
              id="issue_id"
              name="issue_id"
              label="Issue ID"
              autoComplete="issue_id"
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
              onClick={handleSubmit(handleUpdateIssue)}
          >
            Update Project
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








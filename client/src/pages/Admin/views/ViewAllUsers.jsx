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
import { setSelectedUser } from "../adminPageReducer";

const useStyles = makeStyles((theme) => ({
  submit: {
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
  { field: "id", headerName: "Id", width: 50 },
  { field: "username", headerName: "Username", width: 120 },
  { field: "firstname", headerName: "First Name", width: 120 },
  { field: "lastname", headerName: "Last Name", width: 120 },
  { field: "phone", headerName: "Phone", width: 130 },
  { field: "isadmin", headerName: "Admin?", width: 100 },  
];

export default function ViewAllUsers() {
  let selectedUser;
  const classes = useStyles();
  const adminPageState = useSelector((state) => state.adminPage);

  const dispatch = useDispatch(adminPageState);
  // *** Following is not used but retained to refresh component
  const st = useSelector((state) => state.adminPage);
  const [users, setUsers] = useState([]);  

  let rows;
  useEffect(() => {
    async function getUsers() {
      const auth = JSON.parse(localStorage.getItem("adminauth"));
      try {
        const res = await axios.get(`/api/users`, {
          headers: { authorization: auth.token },
        });
        setUsers(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getUsers();
  }, []);


  rows = users.map((item) => ({
    ...item,
    isadmin: item.isadmin === 1 ? "Yes" : "No",
  }));
  

  const rowSelection = (param) => {
    selectedUser = param.data;    
    dispatch(setSelectedUser(selectedUser));
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
          <WrappedEditUserForm />
        </Grid>
      </Grid>
    </Container>
  );
}

function UserUpdateForm(props) {
  const classes = useStyles();
  const { handleSubmit, history } = props;
  const adminPageState = useSelector((state) => state.adminPage);
  const dispatch = useDispatch(adminPageState);
  const { selectedUser } = useSelector((state) => state.adminPage);  
  const handleDeleteUser = (formValues) => {
    const auth = JSON.parse(localStorage.getItem("adminauth"));
    try {
      const res = axios
        .delete(`/api/users/${selectedUser.id}`, {
          headers: { authorization: auth.token },
        })
        .then((res) => {
          dispatch(reset("WrappedEditUserForm"));
          dispatch(setSelectedUser({}));
          window.location.reload();
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateUser = (formValues) => {
    console.log(formValues);
    const auth = JSON.parse(localStorage.getItem("adminauth"));
    try {
      const res = axios
        .patch(
          `/api/users/${selectedUser.id}`,
          {
            password: formValues.password,
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            phone: formValues.phone,
          },
          {
            headers: { authorization: auth.token },
          }
        )
        .then((res) => {
          dispatch(reset("WrappedEditUserForm"));
          dispatch(setSelectedUser({}));
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
        id="username"
        name="username"
        label="User Name"
        autoComplete="username"
        component={TextFieldInput}
        disabled
      />
      <div style={{ color: "red", fontSize: "12px" }}>
        * Username Cannot be updated
      </div>
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
        type="submit"        
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit(handleUpdateUser)}
      >
        Update User
      </Button>
      <Button
        onClick={handleDeleteUser}
        variant="contained"        
        color="primary"
        className={classes.submit}
      >
        Delete User
      </Button>
    </form>
  );
}

let WrappedEditUserForm = reduxForm({
  form: "editUserForm",
  enableReinitialize: true,
})(UserUpdateForm);

// You have to connect() to any reducers that you wish to connect to yourself
WrappedEditUserForm = connect(
  (state) => ({
    initialValues: state.adminPage.selectedUser, // pull initial values from adminPage reducer
  }),
  { load: setSelectedUser } // bind account loading action creator
)(WrappedEditUserForm);

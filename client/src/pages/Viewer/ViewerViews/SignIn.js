import React from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import { setViewerToken } from '../ViewerReducer';
// The Field components job is to render out input html
// and pass down functions for updating the state
// as well as check to see if the values being passed are valid
// and it will do this by passing down props to the component they render
// nombre de usuario
// gebruiksnaam
// const TextFieldInput = ({ input, meta, label }) => {
//   console.log(meta);
//   // console.log('FIELD COMPONENT PROPS', props);
//   return <TextField
//     {...input}
//     label={ language === 'Dutch' ? 'gebruiksnaam':'nombre de usuario'}
//     // label={label}
//   />;
// };

const TextFieldInput = ({ input, meta, label }) => {
  // console.log('FIELD COMPONENT PROPS', props);
  return <TextField
    {...input}
    label={label}
  />;
};

// What Redux form does for us
// It will write the functions for updating form state
// It will also write state to determine the current state of each field
// It also gives us a function for getting the values out of the input
// and then putting it in out submit function

//what handleSubmit will do is pass the forms Values as the first parameter
// handleSubmit also preventsDefault for us right away
// to the function that it's calling
const SignIn = (props) => {
  const { handleSubmit, history } = props;

  console.log(props);
  const handleSignIn = async (formValues, dispatch) => {
    console.log(formValues);
    //{ username: 'Your enterereduseRName', password: 'your password' }
    try {
      const res = await axios.post('/auth/signin', formValues);
      localStorage.setItem('token', res.data);
      dispatch(setViewerToken(res.data));
      history.push('/users');
    } catch (e) {
      throw new Error(e);
    }
  }

  return (
    <form noValidate autoComplete="off">
      <Field
        name='username'
        label='username'
        component={TextFieldInput}
      />
      <Field
        name='password'
        label='password'
        component={TextFieldInput}
      />
      <Button
        onClick={ handleSubmit(handleSignIn) }
        variant="contained"
        color="primary">
        Sign in
      </Button>
    </form>
  );
};

export const WrappedSignIn = reduxForm({ form: 'signInForm' })(SignIn);

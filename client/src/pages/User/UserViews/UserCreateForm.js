import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextFieldInput } from '../../common';
import { useCreateUser } from '../UserHooks';

export const UserCreateForm = reduxForm({ form: 'userCreateForm' })((props) => {
  const { handleSubmit } = props;
  const { handleSaveUser } = useCreateUser();
  return (
    <form onSubmit={handleSubmit(handleSaveUser)}>
      <Field
        name='username'
        component={TextFieldInput}
      />
      <Field
        name='password'
        component={TextFieldInput}
      />
      <Field
        name='anotherState'
        component={TextFieldInput}
      />
      <button type='submit'>Create User</button>
    </form>
  );
});


import React from 'react';
import TextField from '@material-ui/core/TextField';

export const TextFieldInput = ({ input, meta }) => {
  return <TextField
    {...input}
    label="Filled"
    variant="filled"
  />;
};

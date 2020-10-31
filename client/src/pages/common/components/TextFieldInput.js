import React from 'react';
import TextField from '@material-ui/core/TextField';

export const TextFieldInput = ({ input, meta }) => {
  console.log(input);
  return <TextField
    {...input}
    label="Filled"
    variant="filled"
  />;
};

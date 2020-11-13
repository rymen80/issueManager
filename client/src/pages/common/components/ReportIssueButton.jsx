import React from 'react';
import {Button,makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    background: "#f25635",
    color: 'white',
  },
}));

// *** Button used to Report Issue. 
// *** This button will be added to User's Top Nav
export default function ReportIssueButton(props) {
  const classes = useStyles();  
  return (
    <div>
      <Button
        onClick={props.onClick}
        variant="contained"        
        className={classes.button}
      >
        Create
      </Button>
      </div>
  );
}
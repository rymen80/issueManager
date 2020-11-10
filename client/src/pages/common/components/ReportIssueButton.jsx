import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import BugReportIcon from '@material-ui/icons/BugReport';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons(props) {
  const classes = useStyles();
  
  return (
    <div>
      <Button
        onClick={props.onClick}
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<BugReportIcon />}
      >
        Report
      </Button>
      </div>
  );
}
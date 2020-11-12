import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    background: "#EE3311",
    color: 'white',
  },
}));

export default function IconLabelButtons(props) {
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
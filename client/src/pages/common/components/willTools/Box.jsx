import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { boxShadow } from './material-dashboard-react';
const useStyles = makeStyles({boxShadow});

export default function Box() {
    const classes = useStyles();
    return (<h1 className={classes.boxShadow}> something there </h1>)
};

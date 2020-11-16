import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DetailsIcon from "@material-ui/icons/Details";

const useStyles = makeStyles({
  root: {
    width: 150,
    background: "#399ae8",
    color: "white",
    borderRadius: "15%",
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin:"25px",
    
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    backgroundColor: "blue",
  },
});

/** @summary Status card components are divs showing Issue Properties passed as props by user */
const StatusCard = (props) => {
  const count = props.count ? props.count : 0;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>{props.title}</div>
      <div>
        <DetailsIcon />
      </div>
      <div>{count}</div>
    </div>
  );
};

export default StatusCard;

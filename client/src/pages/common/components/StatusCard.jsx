import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DetailsIcon from "@material-ui/icons/Details";
import axios from "axios";

const PRIORITY_ONE = "p1";
const PRIORITY_TWO = "p2";
const PRIORITY_THREE = "p3";
const useStyles = makeStyles({
  root: {
    width: 150,
    background: "#fd5429",
    color: "#e0e0e0",
    borderRadius: "50%",
    height:150,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column"
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    backgroundColor: "blue",
  },
});

const StatusCard = (props) => {
  const count=props.count?props.count:0;
  // const [number, setNumber] = useState(0);
  // const Total = props.total;
  // useEffect(async () => {
  //   let projectResult = await axios.get("/api/projects");
  //   const projectId = projectResult.data.map((i) => i.project_id);
  //   // console.log(projectResult);
    // const issues = projectId.map(i => axios.get(`/api/issues?projectid={${i}}`))
    // console.log("Project", issues);
    // if(props.title === "Total Issues:"){
    //   return setNumber(result.data.length);
    // }
    // if(props.title === "Open:"){
    //   const open = result.data.filter(x => x.priority.toLowerCase() === PRIORITY_ONE)
    //   console.log(result.data)
    //   return setNumber(open.length);
    // }
    // if(props.title === "In Progress:"){
    //   const inProgress = result.data.filter(x => x.priority.toLowerCase() === PRIORITY_TWO)
    //   return setNumber(inProgress.length);
    // }
    // if(props.title === "Completed:"){
    //   const completed = result.data.filter(x => x.priority.toLowerCase() === PRIORITY_THREE)
    //   return setNumber(completed.length);
    // }
    // return setNumber(0);
  // }, []);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Card>
        <CardContent> */}
          {/* <Typography variant="h5" component="h5"> */}
            <div>
            {props.title}

            </div>
            <div>

            <DetailsIcon />
            </div>
            <div>

            {count}
            </div>
          {/* </Typography> */}
          {/* <Typography className={classes.pos} color="textSecondary"> */}
          {/* </Typography> */}
        {/* </CardContent>
      </Card> */}
    </div>
  );
};

export default StatusCard;

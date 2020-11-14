import { Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RenderContext } from "@material-ui/data-grid";
import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import StatusCard from "../../common/components/StatusCard";
import axios from "axios";

const useStyles = makeStyles({
  paper: {
    display:"flex",
    // flexDirection:"column",
    justifyContent:"space-evenly",
    flexWrap:"wrap",
    alignContent:"center",
    // borderRight:"1px solid #fd5429",
    padding:"5px",
    marginLeft:"auto",
    marginRight:"auto",
    width:"90%",
    marginTop:"1%"    
  },
  title: {
    textAlign:"center",
    
  }
});


export function StatusCardsView(){
  const classes=useStyles();
  const userPageState = useSelector((state) => state.userPage);
  const [issues,setIssues] = React.useState([]);
  const visibility = userPageState.visibility;
  let project = userPageState.selectedProject;//useSelector((state) => state.userPage.selectedProject);
  const userauth=JSON.parse(localStorage.getItem("userauth"));
  
  useEffect(()=>{
    const getData = async () => {
      try {
        /** @summary Get only those projects to which user belong */

        const fetchedIssues = await axios.get(
          `/api/issues?projectid=${project.project_id}`,{headers:{'authorization':userauth.token}}
        );
        setIssues(fetchedIssues.data);
        // setProjects(fetchedProjects.data);
        // setProject(fetchedProjects.data[0]);
        // dispatch(setUserProjects(fetchedProjects.data));
        // dispatch(setSelectedProject(fetchedProjects.data[0]));
      } catch (e) {
        // throw new Error(e);
      }
    };
    getData();
  },[]);
  return(
    <>
    <h3 className={classes.title}>Status At Glance</h3>
    <Paper className={classes.paper}>
      <StatusCard title="Total Issue" count={issues.length}/>
      <StatusCard title="P0 Issues (Blockers)" count={issues.filter(i=>i.priority==="P0").length}/>
      <StatusCard title="P1 Issues" count={issues.filter(i=>i.priority==="P1").length}/>
      <StatusCard title="Open" count={issues.filter(i=>i.status===1).length}/>
      <StatusCard title="In Progress" count={issues.filter(i=>i.status===2).length}/>
      <StatusCard title="Closed" count={issues.filter(i=>i.status===3).length}/>
      <StatusCard title="You Reported" count={issues.filter(i=>i.reported_by===userauth.id).length}/>
      <StatusCard title="Assigned To You" count={issues.filter(i=>i.assigned_to===userauth.id).length}/>
    </Paper>
    </>
  );
}
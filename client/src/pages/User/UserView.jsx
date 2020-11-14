import React from "react";
import { useSelector } from "react-redux";
// import StatusCard from "../common/components/StatusCard";
import CreateIssue from "../common/components/CreateIssue";
import ViewIssues from "../common/components/ViewIssues";
import NavbarUser from "../common/components/NavbarUser";
import Footer from "../common/components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import StatusCard from '../common/components/StatusCard';
import { useEffect } from "react";
import ProjecSelectorNew from "../common/components/ProjectSelectorNew";

/**
 * @description using materialUI makeStyles hook to adjust styling on page
 */
const useStyles = makeStyles({
  root: {},
  status: {
    margin: "100px 10px",
    display: "flex",
    justifyContent: "space-around",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  issues: {
    display: "flex",
    justifyContent: "center",
  },
});
/**
 * @description start of UserView component
 */
function UserView() {
  /**
   * @description getting state for visibility from redux store
   */
  const visibility = useSelector((state) => state.userPage.visibility);
  
  let project = useSelector((state) => state.userPage.selectedProject);
  
  useEffect(()=>{console.log("PROJECT",project)},[project]);
  /**
   * @description assigning styles from above to a variable for use in elements
   */
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <NavbarUser></NavbarUser> */}

      {visibility ? <CreateIssue /> : null}
  <div>You Selected : {JSON.stringify(project)}</div>
      <div className={classes.status}>
        <StatusCard title="Total Issues:" />
        <StatusCard title="Open:" />
      </div>
      <div className={classes.issues}>
        {/* <ViewIssues></ViewIssues> */}
      </div>
      {/* <div className={classes.footer}>
        <Footer />
      </div> */}
    </div>
  );
}

export default UserView;

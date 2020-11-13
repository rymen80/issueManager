import React from "react";
import StatusCard from "../common/components/StatusCard";
import CreateIssue from "../common/components/CreateIssue";
import ViewIssues from "../common/components/ViewIssues";
import NavbarUser from "../common/components/NavbarUser";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../common/components/Footer";
import { useSelector} from 'react-redux';

const useStyles = makeStyles({
  root: {
  },
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
  }
});

function UserView() {
  const visibility = useSelector((state) => {
    return state.userPage.visibility;
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavbarUser></NavbarUser>

      {visibility ? <CreateIssue/>: null}
      {/* <div className={classes.status}>
        <StatusCard title="Total Issues:" />
        <StatusCard title="Open:" />
      </div> */}
      <div className={classes.issues}>
      <ViewIssues ></ViewIssues>
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default UserView;
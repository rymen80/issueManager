import React from "react";
import { Typography, makeStyles, Container, Link } from "@material-ui/core";

// *** Styles for the footer
const useStyles = makeStyles((theme) => ({
  footer: {
    position: "absolute",    
    padding: "8px",
    textAlign: "center",
    width:"98%",
    marginTop: "auto",
    marginLeft:"auto",
    marginRight:"auto",
    bottom:"0px",    
    backgroundColor: "#3f51b5",
    height: "15px",
    color: "white",
  },
}));

/**
 * @author William Jacobs
 * Sticky Footer component
 *
 * */
export default function StickyFooter(props) {
  const classes = useStyles();
  return (
    <div>
      <footer className={classes.footer}>
        <Container>
          <Typography variant="body2">
            {"Copyright © "}
            <Link
              color="inherit"
              href="https://github.com/rymen80/issueManager"
            >
              IssUse
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Container>
      </footer>
    </div>
  );
}

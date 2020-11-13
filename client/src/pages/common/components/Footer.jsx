import React from "react";
import { Typography, makeStyles, Container, Link } from "@material-ui/core";

// *** Styles for the footer
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "10px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
    bottom: "0",
    backgroundColor: "#3f51b5",
    height: "30px",
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
          <Typography variant="body2" color="white">
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

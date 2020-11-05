import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";


export function LoginPagesCopyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        issUse
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
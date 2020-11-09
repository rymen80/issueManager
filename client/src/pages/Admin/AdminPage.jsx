import { Container } from '@material-ui/core';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../../styles/App.css';

export function AdminPage(){
  return (
    <>
    <Grid container spacing={1}>
        <Grid item xs={8} className="grid-item">
          <h1>Hey</h1>
        </Grid>
        <Grid item xs={4}>
        <h1>Ho</h1>
        </Grid>
      </Grid>
    </>
  );
}
import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFetchUsers } from '../UserHooks';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export const UserListView = () => {
  const classes = useStyles();
  const { users } = useFetchUsers();

  return (
    <List component="nav" className={classes.root} aria-label="contacts">

      {
        users.map(user => {
          return (
            <ListItem key={user.id} component={Link} to={`/users/user/${user.id}`}>
              <ListItemText primary={user.username}/>
            </ListItem>
          );
        })
      }
    </List>
  );
};

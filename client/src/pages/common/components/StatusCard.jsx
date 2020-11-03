import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 229,
    background: '#99BFDD',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const StatusCard = (props) => {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    // need to add route to set up
  })
  const classes = useStyles();
 
  return(
      <div>
         <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
         {number}
        </Typography>
      </CardContent>
    </Card>
      </div>
  );
}

export default StatusCard;

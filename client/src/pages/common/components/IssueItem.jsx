import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import StyledButton from './StyledButton';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function IssueItem(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                {
                    Object.values(props.data).map((item, index) => (
                        <StyledButton key={index}>
                            {item}
                        </StyledButton>
                    ))
                }
                {/* <StyledButton display="inline" {...props}>
                    {props.issueKey}
                </StyledButton>
                <Typography display="inline">
                    {props.issueKey}
                </Typography>
                <StyledButton display="inline" {...props}>
                    {props.summary}
                </StyledButton>
                <Typography display="inline">
                    {props.summary}
                </Typography>
                <Typography display="inline">
                    {props.priority}
                </Typography>
                <Typography display="inline">
                    {props.label}
                </Typography> */}
            </CardContent>
            {/* <CardActions>
        <Button display="inline" size="small">Learn More</Button>
      </CardActions> */}
        </Card>
    );
}

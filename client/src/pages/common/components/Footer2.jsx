import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import IssUse from '../../../images/issUseBannerTransparent.png';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: "10px",
        marginTop: 'auto',
        bottom: "0",
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    logo: {
        height: "30px",
        width: "80px",
        marginLeft: "300px"
    },
}));

// const handleColor = (isAdmin) => {
//     if (isAdmin) {
//     return "orange"
//     } else {
//         "blue"
//     }
//     };

// use this in the footer color -> color={handleColor}

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <div>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body2" color="textSecondary">
                        {'Copyright © '}
                        <Link color="inherit" href="https://github.com/rymen80/issueManager">
                            IssUse
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                        <img src={IssUse} alt="issUseBannerTransparent" className={classes.logo} />
                    </Typography>
                    
                </Container>
            </footer>
        </div>
    );
}



// // const handleCheckedRight = () => {
//     setRight(right.concat(leftChecked));
//     setLeft(not(left, leftChecked));
//     setChecked(not(checked, leftChecked));
//   };


// const props = {
//     title:"title1", 
//     status:"done",
//     summary:"stuff"
//     Isadmin:true
// }

// console.log(props.title) = title1



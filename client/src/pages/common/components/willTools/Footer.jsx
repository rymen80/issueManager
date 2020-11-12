import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./footerStyle";
import issUse from "../../../../images/issUseLogo.png"; 

const useStyles = makeStyles(styles);

export default function Footer() {
    const classes = useStyles();
    return (<footer className={classes.footer}>
        <div className={classes.container}>
            <div className={classes.left}>
                <List className={classes.list}>
                    <ListItem className={classes.inlineBlock}>
                        <a href="#home" className={classes.block}>
                            Home
                </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                        <a href="#company" className={classes.block}>
                            Company
                </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                        <a href="#portfolio" className={classes.block}>
                            Portfolio
                </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                        <a href="#blog" className={classes.block}>
                            Blog
                </a>
                    </ListItem>
                </List>
            </div>
            <p className={classes.right}>
                <span>
                    &copy; {1900 + new Date().getYear()}{" "}
                    <a
                        href="https://github.com/rymen80/issueManager"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.a}
                    >
                        IssUse 
                        <img src={issUse} alt="issUse logo" className={classes.logo}/>
              </a>
              
            </span>
            </p>
        </div>
    </footer>)
};
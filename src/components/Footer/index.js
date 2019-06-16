// @flow
import * as React from "react";
import {useStyles} from "./styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

type Properties = {};

const Footer = ({}: Properties): React.Node => {
    const classes = useStyles();

    return (
        <Paper elevation={0} className={classes.root}>
            <Typography>
                КУ! верти  © 2019
            </Typography>
        </Paper>
    );
};

export default Footer;
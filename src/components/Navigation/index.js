// @flow
import * as React from "react";
import clsx from "clsx";
import {useTheme} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Add from '@material-ui/icons/Add';
import History from '@material-ui/icons/History';
import Mail from '@material-ui/icons/Mail';
import Help from '@material-ui/icons/Help';

import {LOGIN_KEYS} from "../../types/Auth";
import type {Login} from "../../types/Auth";

import {useStyles} from "./styles";
import Condition from "../HOC/Condition";
import Auth from "./Auth";
import {Link} from "react-router-dom";

type Properties = {
    login: Login,
    menuOpen: boolean,
    onMenuOpenTriggered: () => void
};

const Navigation = ({login, menuOpen, onMenuOpenTriggered}: Properties): React.Node => {
    const classes = useStyles();
    const theme = useTheme();
    const loggedIn = Boolean(login.get(LOGIN_KEYS.TOKEN));

    return (
        <React.Fragment>
            <AppBar position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: menuOpen,
                    })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={onMenuOpenTriggered}
                        edge="start"
                        className={clsx(classes.menuButton, menuOpen && classes.hide)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.title}>
                        Мед +
                    </Typography>
                    <Auth/>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={menuOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={onMenuOpenTriggered}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <Condition match={loggedIn}>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <Add component={Link} to={"/rating"}/>
                            </ListItemIcon>
                            <ListItemText primary={"Новая оценка"}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <History/>
                            </ListItemIcon>
                            <ListItemText primary={"История оценок"}/>
                        </ListItem>
                    </List>
                    <Divider/>
                </Condition>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <Mail/>
                        </ListItemIcon>
                        <ListItemText primary={"Обратная связь"}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Help/>
                        </ListItemIcon>
                        <ListItemText primary={"Помощь"}/>
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    );
};

export default Navigation;
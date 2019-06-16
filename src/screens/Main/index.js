// @flow
import * as React from "react";
import {connect} from "react-redux";

import {selectors} from "../../store/Auth"
import type {Login} from "../../types/Auth";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Messages from "../../components/Messages";
import {useStyles} from "./styles";
import clsx from "clsx";

type Properties = {
    login: Login,
    loginProcessing: boolean,
    children: React.Node
};

const MainScreen = ({loginProcessing, login, children}: Properties): React.Node => {
    const classes = useStyles();
    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

    const handleMenuOpenTriggered = () => setMenuOpen(!menuOpen);

    return (
        <div className={classes.root}>
            <Navigation login={login} menuOpen={menuOpen} onMenuOpenTriggered={handleMenuOpenTriggered}/>
            <main className={clsx(
                classes.content,
                {[classes.contentShift]: menuOpen}
            )}>
                <div className={classes.drawerHeader}/>
                {children}
            </main>
            <Footer/>
            <Messages/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    login: selectors.getLogin(state),
    loginProcessing: selectors.getLoginProcessing(state)
});

export default connect(mapStateToProps)(MainScreen);
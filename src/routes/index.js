import React from "react";
import {Switch, Router, Route} from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import MainScreen from "../screens/Main";
import Ratings from "../screens/Ratings";
import Rating from "../screens/Rating";

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <MainScreen>
                <Route exact path={"/"} component={Ratings}/>
                <Route path={"/rating/:id?"} component={Rating}/>
            </MainScreen>
        </Switch>
    </Router>
);

export default AppRouter;
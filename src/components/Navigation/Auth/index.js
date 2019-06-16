// @flow
// import * as React from "react";
import {selectors, actions} from "../../../store/Auth";
// import type {Login, Register} from "../../../types/Auth";
import {connect} from "react-redux";
import AuthView from "./AuthView";

/*
type Properties = {
    login: Login,
    loginProcessing: boolean,
    registration: Register,
    registrationProcessing: boolean
};
*/

const mapStateToProps = (state) => ({
    registration: selectors.getRegistration(state),
    registrationProcessing: selectors.getRegistrationProcessing(state),
    login: selectors.getLogin(state),
    loginProcessing: selectors.getLoginProcessing(state)
});

export default connect(mapStateToProps, {onLogout: actions.logoutUser})(AuthView);
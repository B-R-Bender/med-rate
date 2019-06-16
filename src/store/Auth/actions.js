// @flow
import axios from "axios"
import {ACTION_TYPES, BASE_API_URI} from "./constants";
import type {ThunkAction} from "./constants";
import type {Login, Register} from "../../types/Auth";

export default {
    registerUser,
    loginUser,
    logoutUser
};

function registerUser(data: Register): ThunkAction {
    return dispatch => {
        request();

        axios.put(`${BASE_API_URI}/create`, data.toJS())
            .then(
                response => success(response.data),
                () => failure()
            );

        function request() {
            dispatch({type: ACTION_TYPES.AUTH_REGISTER_REQUEST, payload: data});
        }

        function success(data: {id: number}) {
            dispatch({type: ACTION_TYPES.AUTH_REGISTER_SUCCESS, payload: !!data.id});
        }

        function failure() {
            dispatch({type: ACTION_TYPES.AUTH_REGISTER_FAILURE});
        }
    };
}

function loginUser(data: Login): ThunkAction {
    return dispatch => {
        request();

        axios.get(`${BASE_API_URI}/find?login=${data.login}&password=${data.password}`)
            .then(
                response => success(response.data),
                () => failure()
            );

        function request() {
            dispatch({type: ACTION_TYPES.AUTH_LOGIN_REQUEST, payload: data});
        }

        function success(data: {id: number}) {
            dispatch({type: ACTION_TYPES.AUTH_LOGIN_SUCCESS, payload: data.id});
        }

        function failure() {
            dispatch({type: ACTION_TYPES.AUTH_LOGIN_FAILURE});
        }
    };
}

function logoutUser(): ThunkAction {
    return dispatch => dispatch({type: ACTION_TYPES.AUTH_LOGOUT});
}

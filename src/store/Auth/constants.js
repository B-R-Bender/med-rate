// @flow
import type {Login, Register} from "../../types/Auth";

export const BASE_API_URI = "http://tomcat.rs-soft.site/hackathon-app-1.0-SNAPSHOT/dictionaries/clients";

export const STORE_PATH: "AUTH" = "AUTH";

const AUTH_REGISTER_REQUEST: "AUTH_REGISTER_REQUEST" = "AUTH_REGISTER_REQUEST";
const AUTH_REGISTER_SUCCESS: "AUTH_REGISTER_SUCCESS" = "AUTH_REGISTER_SUCCESS";
const AUTH_REGISTER_FAILURE: "AUTH_REGISTER_FAILURE" = "AUTH_REGISTER_FAILURE";

const AUTH_LOGIN_REQUEST: "AUTH_LOGIN_REQUEST" = "AUTH_LOGIN_REQUEST";
const AUTH_LOGIN_SUCCESS: "AUTH_LOGIN_SUCCESS" = "AUTH_LOGIN_SUCCESS";
const AUTH_LOGIN_FAILURE: "AUTH_LOGIN_FAILURE" = "AUTH_LOGIN_FAILURE";

const AUTH_LOGOUT: "AUTH_LOGOUT" = "AUTH_LOGOUT";

export const ACTION_TYPES = Object.freeze({
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT
});

export type AuthRegisterRequest = {
    type: typeof AUTH_REGISTER_REQUEST,
    payload: Register
}

export type AuthRegisterSuccess = {
    type: typeof AUTH_REGISTER_SUCCESS,
    payload: boolean
}

export type AuthRegisterFailure = {
    type: typeof AUTH_REGISTER_FAILURE
}

export type AuthLoginRequest = {
    type: typeof AUTH_LOGIN_REQUEST,
    payload: Login
}

export type AuthLoginSuccess = {
    type: typeof AUTH_LOGIN_SUCCESS,
    payload: string
}

export type AuthLoginFailure = {
    type: typeof AUTH_LOGIN_FAILURE
}

export type AuthLogout = {
    type: typeof AUTH_LOGOUT
}

export type Action =
    | AuthRegisterRequest
    | AuthRegisterSuccess
    | AuthRegisterFailure
    | AuthLoginRequest
    | AuthLoginSuccess
    | AuthLoginFailure
    | AuthLogout;

export type ThunkAction = (dispatch: (action: Action | ThunkAction | Promise<Action> | Array<Action>) => any) => any;
// @flow
import type {RecordFactory, RecordOf} from "immutable";
import {Record} from "immutable";

const NAME: "fullName" = "fullName";
const OMS: "oms" = "oms";
const REGION: "region" = "region";
const CITY: "city" = "city";
const POLYCLINIC: "polyclinicId" = "polyclinicId";
const LOGIN: "login" = "login";
const EMAIL: "email" = "email";
const PASSWORD: "password" = "password";
const PASSWORD_CONFIRM: "passwordConfirm" = "passwordConfirm";
const SUCCESS: "success" = "success";

type RegisterProps = {|
    fullName: string,
    oms: number,
    region: number,
    city: number,
    polyclinicId: number,
    login: string,
    email: string,
    password: string,
    passwordConfirm: string,
    success: boolean
|};
const registerDefaults: RegisterProps = {
    [NAME]: "",
    [OMS]: 0,
    [REGION]: 0,
    [CITY]: 0,
    [POLYCLINIC]: 0,
    [LOGIN]: "",
    [EMAIL]: "",
    [PASSWORD]: "",
    [PASSWORD_CONFIRM]: "",
    [SUCCESS]: false
};
export const REGISTER_KEYS = Object.freeze({NAME, OMS, REGION, CITY, POLYCLINIC, LOGIN, EMAIL, PASSWORD, PASSWORD_CONFIRM, SUCCESS});
export const registerBuilder: RecordFactory<RegisterProps> = Record(registerDefaults);
export type Register = RecordOf<RegisterProps>;

const TOKEN: "token" = "token";

type LoginProps = {|
    login: string,
    password: string,
    token: ?string
|};
const loginDefaults: LoginProps = {
    [LOGIN]: "",
    [PASSWORD]: "",
    [TOKEN]: null
};
export const LOGIN_KEYS = Object.freeze({LOGIN, PASSWORD, TOKEN});
export const loginBuilder: RecordFactory<LoginProps> = Record(loginDefaults);
export type Login = RecordOf<LoginProps>;


// @flow
import type {RecordOf} from "immutable";
import {Record} from "immutable";

import type {Action} from "./constants";
import {ACTION_TYPES, STORE_PATH} from "./constants";
import type {Login, Register} from "../../types/Auth";
import {LOGIN_KEYS, loginBuilder, REGISTER_KEYS, registerBuilder} from "../../types/Auth";

const REGISTER_STATE_KEY = "register";
const REGISTER_PROCESSING_STATE_KEY = "registerProcessing";
const LOGIN_STATE_KEY = "login";
const LOGIN_PROCESSING_STATE_KEY = "loginProcessing";

type StateProps = {
    register: Register,
    registerProcessing: boolean,
    login: Login,
    loginProcessing: boolean
};
type State = RecordOf<StateProps>;

const initialState: State = Record({
    [REGISTER_STATE_KEY]: registerBuilder(),
    [REGISTER_PROCESSING_STATE_KEY]: false,
    [LOGIN_STATE_KEY]: loginBuilder(),
    [LOGIN_PROCESSING_STATE_KEY]: false
})();

export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ACTION_TYPES.AUTH_REGISTER_REQUEST:
            return state.merge({
                [REGISTER_STATE_KEY]: action.payload,
                [REGISTER_PROCESSING_STATE_KEY]: true
            });
        case ACTION_TYPES.AUTH_REGISTER_SUCCESS:
            return state.merge({
                [REGISTER_STATE_KEY]: state.get(REGISTER_STATE_KEY).set(REGISTER_KEYS.SUCCESS, action.payload),
                [REGISTER_PROCESSING_STATE_KEY]: false
            });
        case ACTION_TYPES.AUTH_REGISTER_FAILURE:
            return state.merge({
                [REGISTER_STATE_KEY]: state.get(REGISTER_STATE_KEY).set(REGISTER_KEYS.SUCCESS, false),
                [REGISTER_PROCESSING_STATE_KEY]: false
            });
        case ACTION_TYPES.AUTH_LOGIN_REQUEST:
            return state.merge({
                [LOGIN_STATE_KEY]: action.payload,
                [LOGIN_PROCESSING_STATE_KEY]: true
            });
        case ACTION_TYPES.AUTH_LOGIN_SUCCESS:
            return state.merge({
                [LOGIN_STATE_KEY]: state.get(LOGIN_STATE_KEY).set(LOGIN_KEYS.TOKEN, action.payload),
                [LOGIN_PROCESSING_STATE_KEY]: false
            });
        case ACTION_TYPES.AUTH_LOGIN_FAILURE:
            return state.merge({
                [LOGIN_STATE_KEY]: state.get(LOGIN_STATE_KEY).set(LOGIN_KEYS.TOKEN, null),
                [LOGIN_PROCESSING_STATE_KEY]: false
            });
        case ACTION_TYPES.AUTH_LOGOUT:
            return state.merge({
                [LOGIN_STATE_KEY]: loginBuilder()
            });
        default:
            return state;
    }
};

export const selectors = {
    getRegistration: (state: {[typeof STORE_PATH]: State}): Register => state[STORE_PATH].get(REGISTER_STATE_KEY),
    getRegistrationProcessing: (state: {[typeof STORE_PATH]: State}): boolean => state[STORE_PATH].get(REGISTER_PROCESSING_STATE_KEY),
    getLogin: (state: {[typeof STORE_PATH]: State}): Login => state[STORE_PATH].get(LOGIN_STATE_KEY),
    getLoginProcessing: (state: {[typeof STORE_PATH]: State}): boolean => state[STORE_PATH].get(LOGIN_PROCESSING_STATE_KEY)
};
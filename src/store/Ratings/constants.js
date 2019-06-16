// @flow
import {Set} from "immutable";
import type {Ratings} from "../../types/Ratings";

//TODO: API
export const BASE_API_URI = "http://tomcat.rs-soft.site/hackathon-app-1.0-SNAPSHOT/";

export const STORE_PATH: "RATINGS" = "RATINGS";

const RATINGS_REQUEST: "RATINGS_REQUEST" = "RATINGS_REQUEST";
const RATINGS_SUCCESS: "RATINGS_SUCCESS" = "RATINGS_SUCCESS";
const RATINGS_FAILURE: "RATINGS_FAILURE" = "RATINGS_FAILURE";

export const ACTION_TYPES = Object.freeze({
    RATINGS_REQUEST,
    RATINGS_SUCCESS,
    RATINGS_FAILURE,
});

export type RatingsRequest = {
    type: typeof RATINGS_REQUEST,
}

export type RatingsSuccess = {
    type: typeof RATINGS_SUCCESS,
    payload: Set<Ratings>
}

export type RatingsFailure = {
    type: typeof RATINGS_FAILURE
}

export type Action =
    | RatingsRequest
    | RatingsSuccess
    | RatingsFailure;

export type ThunkAction = (dispatch: (action: Action | ThunkAction | Promise<Action> | Array<Action>) => any) => any;
// @flow
import {Set} from "immutable";
import type {Dictionary} from "../../types/Meta";

export const BASE_API_URI = "http://tomcat.rs-soft.site/hackathon-app-1.0-SNAPSHOT/dictionaries";

export const STORE_PATH: "META" = "META";

const REGIONS_REQUEST: "REGIONS_REQUEST" = "REGIONS_REQUEST";
const REGIONS_SUCCESS: "REGIONS_SUCCESS" = "REGIONS_SUCCESS";
const REGIONS_FAILURE: "REGIONS_FAILURE" = "REGIONS_FAILURE";

const CITIES_REQUEST: "CITIES_REQUEST" = "CITIES_REQUEST";
const CITIES_SUCCESS: "CITIES_SUCCESS" = "CITIES_SUCCESS";
const CITIES_FAILURE: "CITIES_FAILURE" = "CITIES_FAILURE";

const POLYCLINIC_REQUEST: "POLYCLINIC_REQUEST" = "POLYCLINIC_REQUEST";
const POLYCLINIC_SUCCESS: "POLYCLINIC_SUCCESS" = "POLYCLINIC_SUCCESS";
const POLYCLINIC_FAILURE: "POLYCLINIC_FAILURE" = "POLYCLINIC_FAILURE";

const MEDIC_TYPE_REQUEST: "MEDIC_TYPE_REQUEST" = "MEDIC_TYPE_REQUEST";
const MEDIC_TYPE_SUCCESS: "MEDIC_TYPE_SUCCESS" = "MEDIC_TYPE_SUCCESS";
const MEDIC_TYPE_FAILURE: "MEDIC_TYPE_FAILURE" = "MEDIC_TYPE_FAILURE";

export const ACTION_TYPES = Object.freeze({
    REGIONS_REQUEST,
    REGIONS_SUCCESS,
    REGIONS_FAILURE,
    CITIES_REQUEST,
    CITIES_SUCCESS,
    CITIES_FAILURE,
    POLYCLINIC_REQUEST,
    POLYCLINIC_SUCCESS,
    POLYCLINIC_FAILURE,
    MEDIC_TYPE_REQUEST,
    MEDIC_TYPE_SUCCESS,
    MEDIC_TYPE_FAILURE
});

export type RegionsRequest = {
    type: typeof REGIONS_REQUEST,
}

export type RegionsSuccess = {
    type: typeof REGIONS_SUCCESS,
    payload: Set<Dictionary>
}

export type RegionsFailure = {
    type: typeof REGIONS_FAILURE
}

export type CitiesRequest = {
    type: typeof CITIES_REQUEST
}

export type CitiesSuccess = {
    type: typeof CITIES_SUCCESS,
    id: number,
    payload: Set<Dictionary>
}

export type CitiesFailure = {
    type: typeof CITIES_FAILURE
}

export type PolyclinicRequest = {
    type: typeof CITIES_REQUEST
}

export type PolyclinicSuccess = {
    type: typeof CITIES_SUCCESS,
    id: number,
    payload: Set<Dictionary>
}

export type PolyclinicFailure = {
    type: typeof CITIES_FAILURE
}

export type MedicTypeRequest = {
    type: typeof MEDIC_TYPE_REQUEST
}

export type MedicTypeSuccess = {
    type: typeof MEDIC_TYPE_SUCCESS,
    id: number,
    payload: Set<Dictionary>
}

export type MedicTypeFailure = {
    type: typeof MEDIC_TYPE_FAILURE
}

export type Action =
    | RegionsRequest
    | RegionsSuccess
    | RegionsFailure
    | CitiesRequest
    | CitiesSuccess
    | CitiesFailure
    | PolyclinicRequest
    | PolyclinicSuccess
    | PolyclinicFailure
    | MedicTypeRequest
    | MedicTypeSuccess
    | MedicTypeFailure;

export type ThunkAction = (dispatch: (action: Action | ThunkAction | Promise<Action> | Array<Action>) => any) => any;
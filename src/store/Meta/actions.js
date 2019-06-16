// @flow
import axios from "axios"
import {Set} from "immutable";
import {ACTION_TYPES, BASE_API_URI} from "./constants";
import type {ThunkAction} from "./constants";
import {dictionaryBuilder} from "../../types/Meta";

export default {
    loadRegions,
    loadCities,
    loadPolyclinics,
    loadMedicType
};

function loadRegions(): ThunkAction {
    return dispatch => {
        request();

        axios.get(`${BASE_API_URI}/regions`)
            .then(
                response => success(response.data),
                () => failure()
            );

        function request() {
            dispatch({type: ACTION_TYPES.REGIONS_REQUEST});
        }

        function success(data: Array<{}>) {
            dispatch({type: ACTION_TYPES.REGIONS_SUCCESS, payload: Set(data.map(region => dictionaryBuilder(region)))});
        }

        function failure() {
            dispatch({type: ACTION_TYPES.REGIONS_FAILURE});
        }
    };
}

function loadCities(id: number): ThunkAction {
    return dispatch => {
        request();

        axios.get(`${BASE_API_URI}/regions/${id}/cities`)
            .then(
                response => success(response.data),
                () => failure()
            );

        function request() {
            dispatch({type: ACTION_TYPES.CITIES_REQUEST});
        }

        function success(data: Array<{}>) {
            dispatch({
                type: ACTION_TYPES.CITIES_SUCCESS,
                id,
                payload: Set(data.map(city => dictionaryBuilder(city)))
            });
        }

        function failure() {
            dispatch({type: ACTION_TYPES.CITIES_FAILURE});
        }
    };
}

function loadPolyclinics(id: number): ThunkAction {
    return dispatch => {
        request();

        axios.get(`${BASE_API_URI}/cities/${id}/polyclinics`)
            .then(
                response => success(response.data),
                () => failure()
            );

        function request() {
            dispatch({type: ACTION_TYPES.POLYCLINIC_REQUEST});
        }

        function success(data: Array<{}>) {
            dispatch({
                type: ACTION_TYPES.POLYCLINIC_SUCCESS,
                id,
                payload: Set(data.map(polyclinic => dictionaryBuilder(polyclinic)))
            });
        }

        function failure() {
            dispatch({type: ACTION_TYPES.POLYCLINIC_FAILURE});
        }
    };
}

function loadMedicType(id: number): ThunkAction {
    return dispatch => {
        request();

        axios.get(`${BASE_API_URI}/polyclinics/${id}/specialities`)
            .then(
                response => success(response.data),
                () => failure()
            );

        function request() {
            dispatch({type: ACTION_TYPES.MEDIC_TYPE_REQUEST});
        }

        function success(data: Array<{}>) {
            dispatch({
                type: ACTION_TYPES.MEDIC_TYPE_SUCCESS,
                id,
                payload: Set(data.map(medicType => dictionaryBuilder(medicType)))
            });
        }

        function failure() {
            dispatch({type: ACTION_TYPES.MEDIC_TYPE_FAILURE});
        }
    };
}
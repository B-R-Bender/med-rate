// @flow
import axios from "axios";
import {Map, Set} from "immutable";
import {ACTION_TYPES, BASE_API_URI} from "./constants";
import type {ThunkAction} from "./constants";
import type {Ratings} from "../../types/Ratings";
import {ratingsBuilder} from "../../types/Ratings";
import Typography from "../../components/Rating";
import * as React from "react";

export default {
    loadRatings
};

function loadRatings(): ThunkAction {
    return dispatch => {
        request();

        axios.get(BASE_API_URI)
            .then(
                response => success(response.data),
                () => failure()
            );

        function request() {
            dispatch({type: ACTION_TYPES.RATINGS_REQUEST});
        }

        function success(data: Array<{}>) {
            dispatch({
                type: ACTION_TYPES.RATINGS_SUCCESS,
                payload: Set(data.map(rating => ratingsBuilder(rating)))
            });
        }

        function failure() {
            dispatch({
                type: ACTION_TYPES.RATINGS_SUCCESS,
                payload: Set([{
                    polyclinic: "ГБУЗ РК Симферопольская поликлиника № 4",
                    common_rating: 3,
                    detailed_rating: Map({"Техническое состояние помещения": 3, "Вежливость персонала": 4, "Опрятность персонала": 4})
                },{
                    polyclinic: "ГБУЗ РК Поликлиника № 3",
                    common_rating: 3,
                    detailed_rating: Map({"Техническое состояние помещения": 3, "Вежливость персонала": 3, "Опрятность персонала": 5})
                }].map(rating => ratingsBuilder(rating)))
            });

        }

        /*
                function failure() {
                    dispatch({type: ACTION_TYPES.RATINGS_FAILURE});
                }
        */
    };
}

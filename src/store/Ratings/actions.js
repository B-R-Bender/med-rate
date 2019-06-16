// @flow
import axios from "axios";
import {Map, Set} from "immutable";
import {ACTION_TYPES, BASE_API_URI} from "./constants";
import type {ThunkAction} from "./constants";
import type {Ratings} from "../../types/Ratings";
import {ratingsBuilder} from "../../types/Ratings";

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
                    polyclinic: "ПОЛИКИЛИНИКА НГАХУЙ",
                    common_rating: 3,
                    detailed_rating: Map({lalal: 3, tratratra: 2})
                },{
                    polyclinic: "ПОЛИКИЛИНИКА НГАХУЙ 2",
                    common_rating: 3,
                    detailed_rating: Map({lalal: 3, tratratra: 2})
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

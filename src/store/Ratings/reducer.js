// @flow
import type {RecordOf} from "immutable";
import {Record, Set} from "immutable";

import type {Action} from "./constants";
import {ACTION_TYPES, STORE_PATH} from "./constants";
import type {Ratings} from "../../types/Ratings";

const RATINGS_STATE_KEY = "ratings";
const RATINGS_PROCESSING_STATE_KEY = "ratingsProcessing";

type StateProps = {
    ratings: Set<Ratings>,
    ratingsProcessing: boolean,
};
type State = RecordOf<StateProps>;

const initialState: State = Record({
    [RATINGS_STATE_KEY]: Set(),
    [RATINGS_PROCESSING_STATE_KEY]: false,
})();

export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ACTION_TYPES.RATINGS_REQUEST:
            return state.set(RATINGS_PROCESSING_STATE_KEY, true);
        case ACTION_TYPES.RATINGS_SUCCESS:
            return state.merge({
                [RATINGS_STATE_KEY]: action.payload,
                [RATINGS_PROCESSING_STATE_KEY]: false
            });
        case ACTION_TYPES.RATINGS_FAILURE:
            return state.set(RATINGS_PROCESSING_STATE_KEY, true);
        default:
            return state;
    }
};

export const selectors = {
    getRatings: (state: { [typeof STORE_PATH]: State }): Set<Ratings> => state[STORE_PATH].get(RATINGS_STATE_KEY),
    getRatingsProcessing: (state: { [typeof STORE_PATH]: State }): boolean => state[STORE_PATH].get(RATINGS_PROCESSING_STATE_KEY),
};
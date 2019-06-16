import {combineReducers} from "redux";

import authReducer, {STORE_PATH as AUTH_STORE_PATH} from "./Auth";
import ratingsReducer, {STORE_PATH as RATINGS_STORE_PATH} from "./Ratings";
import metaReducer, {STORE_PATH as META_STORE_PATH} from "./Meta";
import ratingReducer, {STORE_PATH as RATING_STORE_PATH} from "./Rating";

const rootReducer = combineReducers({
    [AUTH_STORE_PATH]: authReducer,
    [RATINGS_STORE_PATH]: ratingsReducer,
    [META_STORE_PATH]: metaReducer,
    [RATING_STORE_PATH]: ratingReducer
});

export default rootReducer;
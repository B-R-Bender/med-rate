// @flow
import type {RecordOf} from "immutable";
import {Record, Map, Set} from "immutable";

import type {Action} from "./constants";
import {ACTION_TYPES, STORE_PATH} from "./constants";
import type {Dictionary} from "../../types/Meta";

const REGIONS_STATE_KEY = "regions";
const REGIONS_PROCESSING_STATE_KEY = "regionsProcessing";
const CITIES_STATE_KEY = "cities";
const CITIES_PROCESSING_STATE_KEY = "citiesProcessing";
const POLYCLINICS_STATE_KEY = "polyclinics";
const POLYCLINICS_PROCESSING_STATE_KEY = "polyclinicsProcessing";
const MEDIC_TYPE_STATE_KEY = "medicType";
const MEDIC_TYPE_PROCESSING_STATE_KEY = "medicTypeProcessing";

type StateProps = {|
    regions: Set<Dictionary>,
    regionsProcessing: boolean,
    cities: Map<number, Dictionary>,
    citiesProcessing: boolean,
    polyclinics: Map<number, Dictionary>,
    polyclinicsProcessing: boolean
|};
type State = RecordOf<StateProps>;

const initialState: State = Record({
    [REGIONS_STATE_KEY]: Set(),
    [REGIONS_PROCESSING_STATE_KEY]: false,
    [CITIES_STATE_KEY]: Map(),
    [CITIES_PROCESSING_STATE_KEY]: false,
    [POLYCLINICS_STATE_KEY]: Map(),
    [POLYCLINICS_PROCESSING_STATE_KEY]: false,
    [MEDIC_TYPE_STATE_KEY]: Map(),
    [MEDIC_TYPE_PROCESSING_STATE_KEY]: false
})();

export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ACTION_TYPES.REGIONS_REQUEST:
            return state.set(REGIONS_PROCESSING_STATE_KEY, true);
        case ACTION_TYPES.REGIONS_SUCCESS:
            return state.merge({
                [REGIONS_STATE_KEY]: action.payload,
                [REGIONS_PROCESSING_STATE_KEY]: false
            });
        case ACTION_TYPES.REGIONS_FAILURE:
            return state.set(REGIONS_PROCESSING_STATE_KEY, false);
        case ACTION_TYPES.CITIES_REQUEST:
            return state.set(CITIES_PROCESSING_STATE_KEY, true);
        case ACTION_TYPES.CITIES_SUCCESS:
            return state.merge({
                [CITIES_STATE_KEY]: state.get(CITIES_STATE_KEY).set(action.id, action.payload),
                [CITIES_PROCESSING_STATE_KEY]: false
            });
        case ACTION_TYPES.CITIES_FAILURE:
            return state.set(CITIES_PROCESSING_STATE_KEY, false);
        case ACTION_TYPES.POLYCLINIC_REQUEST:
            return state.set(POLYCLINICS_PROCESSING_STATE_KEY, true);
        case ACTION_TYPES.POLYCLINIC_SUCCESS:
            return state.merge({
                [POLYCLINICS_STATE_KEY]: state.get(POLYCLINICS_STATE_KEY).set(action.id, action.payload),
                [POLYCLINICS_PROCESSING_STATE_KEY]: false
            });
        case ACTION_TYPES.POLYCLINIC_FAILURE:
            return state.set(POLYCLINICS_PROCESSING_STATE_KEY, false);
        case ACTION_TYPES.MEDIC_TYPE_REQUEST:
            return state.set(MEDIC_TYPE_PROCESSING_STATE_KEY, true);
        case ACTION_TYPES.MEDIC_TYPE_SUCCESS:
            return state.merge({
                [MEDIC_TYPE_STATE_KEY]: state.get(MEDIC_TYPE_STATE_KEY).set(action.id, action.payload),
                [MEDIC_TYPE_PROCESSING_STATE_KEY]: false
            });
        case ACTION_TYPES.MEDIC_TYPE_FAILURE:
            return state.set(MEDIC_TYPE_PROCESSING_STATE_KEY, false);
        default:
            return state;
    }
};

export const selectors = {
    getRegions: (state: { [typeof STORE_PATH]: State }): Dictionary => state[STORE_PATH].get(REGIONS_STATE_KEY),
    getRegionsProcessing: (state: { [typeof STORE_PATH]: State }): boolean => state[STORE_PATH].get(REGIONS_PROCESSING_STATE_KEY),
    getCities: (state: { [typeof STORE_PATH]: State }): Map<string, Dictionary> => state[STORE_PATH].get(CITIES_STATE_KEY),
    getCitiesProcessing: (state: { [typeof STORE_PATH]: State }): boolean => state[STORE_PATH].get(CITIES_PROCESSING_STATE_KEY),
    getPolyclinics: (state: { [typeof STORE_PATH]: State }): Map<string, Dictionary> => state[STORE_PATH].get(POLYCLINICS_STATE_KEY),
    getPolyclinicsProcessing: (state: { [typeof STORE_PATH]: State }): boolean => state[STORE_PATH].get(POLYCLINICS_PROCESSING_STATE_KEY),
    getMedicType: (state: { [typeof STORE_PATH]: State }): Map<string, Dictionary> => state[STORE_PATH].get(MEDIC_TYPE_STATE_KEY),
    getMedicTypeProcessing: (state: { [typeof STORE_PATH]: State }): boolean => state[STORE_PATH].get(MEDIC_TYPE_PROCESSING_STATE_KEY)
};
// @flow
import type {RecordOf} from "immutable";
import {Record, Map, Set} from "immutable";

import type {Action} from "./constants";
import {ACTION_TYPES, STORE_PATH} from "./constants";
import type {Dictionary} from "../../types/Meta";

type StateProps = {|
    userId: number,
    stepOne: {
        diagnosisId: number,
        symptoms: string,
        polyclinicId: number
    },
    stepTwo: {
        appointmentTypeId: number,
        appointmentId: string,
        appointmentDate: string,
        medicTypeId: number
    },
    stepTree: {
        appointmentDateActual: string,
        medicName: string,
        meta: {
            temperature: boolean,
            bloodPressure: boolean,
            inspection: boolean
        }
    },
    stepFour: {
        technicalState: number,
        politeness: number,
        neatness: number
    }
|};
type State = RecordOf<StateProps>;

const initialState: State = {
    userId: 0,
    stepOne: {
        diagnosisId: 0,
        symptoms: "",
        polyclinicId: 0
    },
    stepTwo: {
        appointmentTypeId: 0,
        appointmentId: "",
        appointmentDate: "",
        medicTypeId: 0
    },
    stepTree: {
        appointmentDateActual: "",
        medicName: "",
        meta: {
            temperature: false,
            bloodPressure: false,
            inspection: false
        }
    },
    stepFour: {
        technicalState: 0,
        politeness: 0,
        neatness: 0
    }
};

export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ACTION_TYPES.RATING_SET_STEP_ONE:
        case ACTION_TYPES.RATING_SET_STEP_TWO:
        case ACTION_TYPES.RATING_SET_STEP_THREE:
        case ACTION_TYPES.RATING_SET_STEP_FOUR:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export const selectors = {
};
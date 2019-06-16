// @flow
import {Set} from "immutable";
import type {Dictionary} from "../../types/Meta";

export const BASE_API_URI = "http://tomcat.rs-soft.site/hackathon-app-1.0-SNAPSHOT/dictionaries";

export const STORE_PATH: "RATING" = "RATING";

const RATING_SET_STEP_ONE: "RATING_SET_STEP_ONE" = "RATING_SET_STEP_ONE";
const RATING_SET_STEP_TWO: "RATING_SET_STEP_TWO" = "RATING_SET_STEP_TWO";
const RATING_SET_STEP_THREE: "RATING_SET_STEP_THREE" = "RATING_SET_STEP_THREE";
const RATING_SET_STEP_FOUR: "RATING_SET_STEP_FOUR" = "RATING_SET_STEP_FOUR";

export const ACTION_TYPES = Object.freeze({
    RATING_SET_STEP_ONE,
    RATING_SET_STEP_TWO,
    RATING_SET_STEP_THREE,
    RATING_SET_STEP_FOUR
});

export type RatingSetStepOne = {
    type: typeof RATING_SET_STEP_ONE,
    payload: {
        userId: number,
        stepOne: {
            diagnosisId: number,
            symptoms: string,
            polyclinicId: number
        }
    }
}

export type RatingSetStepTwo = {
    type: typeof RATING_SET_STEP_TWO,
    payload: {
        appointmentTypeId: number,
        appointmentId: string,
        appointmentDate: string,
        medicTypeId: number
    }
}

export type RatingSetStepThree = {
    type: typeof RATING_SET_STEP_THREE,
    payload: {
        appointmentDateActual: string,
        medicName: string,
        meta: {
            temperature: boolean,
            bloodPressure: boolean,
            inspection: boolean
        }
    }
}

export type RatingSetStepFour = {
    type: typeof RATING_SET_STEP_FOUR,
    payload: {
        technicalState: number,
        politeness: number,
        neatness: number
    }
}

export type Action =
    | RatingSetStepOne
    | RatingSetStepTwo
    | RatingSetStepThree
    | RatingSetStepFour;

export type ThunkAction = (dispatch: (action: Action | ThunkAction | Promise<Action> | Array<Action>) => any) => any;
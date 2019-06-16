// @flow
import type {RecordFactory, RecordOf} from "immutable";
import {Record, Map} from "immutable";

const POLYCLINIC: "polyclinic" = "polyclinic";
const COMMON_RATING: "common_rating" = "common_rating";
const DETAILED_RATING: "detailed_rating" = "detailed_rating";

type RatingsProps = {|
    polyclinic: string,
    common_rating: number,
    detailed_rating: Map<string, number>
|};
const ratingsDefaults: RatingsProps = {
    [POLYCLINIC]: "",
    [COMMON_RATING]: 0,
    [DETAILED_RATING]: Map()
};
export const RATINGS_KEYS = Object.freeze({POLYCLINIC, COMMON_RATING, DETAILED_RATING});
export const ratingsBuilder: RecordFactory<RatingsProps> = Record(ratingsDefaults);
export type Ratings = RecordOf<RatingsProps>;

// @flow
import type {RecordFactory, RecordOf} from "immutable";
import {Record} from "immutable";

const ID: "id" = "id";
const NAME: "name" = "name";

type DictionaryProps = {|
    id: number,
    name: string
|};
const dictionaryDefaults: DictionaryProps = {
    [ID]: 0,
    [NAME]: ""
};
export const DICTIONARY_KEYS = Object.freeze({ID, NAME});
export const dictionaryBuilder: RecordFactory<DictionaryProps> = Record(dictionaryDefaults);
export type Dictionary = RecordOf<DictionaryProps>;


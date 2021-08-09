import {LanguageType} from "./slice";
import {BaseAction} from "../auth/types";

export const SET_LANGUAGE = 'SET_LANGUAGE'
export const REQUEST_LANGUAGE = 'REQUEST_LANGUAGE'

export interface SetLanguageAction extends BaseAction {
    payload: LanguageType
}

export interface RequestLanguageAction extends BaseAction {
    payload: undefined
}

export const setLanguage = (language: LanguageType): SetLanguageAction => ({
    type: SET_LANGUAGE,
    payload: language
})

export const requestLanguage = (): RequestLanguageAction => ({
    type: REQUEST_LANGUAGE,
    payload: undefined
})
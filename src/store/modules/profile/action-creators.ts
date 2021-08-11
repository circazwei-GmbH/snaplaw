import {LanguageType} from "./slice";
import {BaseAction} from "../auth/types";

export const SET_LANGUAGE = 'SET_LANGUAGE'
export const REQUEST_LANGUAGE = 'REQUEST_LANGUAGE'
export const UPDATE_AVATAR = 'UPDATE_AVATAR'
export const DELETE_AVATAR = 'DELETE_AVATAR'


export interface SetLanguageAction extends BaseAction {
    payload: LanguageType
}

export interface RequestLanguageAction extends BaseAction {
    payload: undefined
}

export interface UpdateAvatarAction extends BaseAction {
    payload: undefined | string
}

export interface DeleteAvatarAction extends BaseAction {
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

export const updateAvatar = (uri?: string): UpdateAvatarAction => ({
    type: UPDATE_AVATAR,
    payload: uri
})

export const deleteAvatar = (): DeleteAvatarAction => ({
    type: DELETE_AVATAR,
    payload: undefined
})


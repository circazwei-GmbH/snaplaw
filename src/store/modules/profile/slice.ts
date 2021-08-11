import {createAction, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {LANGUAGE_ENGLISH, LANGUAGE_GERMANY} from "./constants";

export type LanguageType = 'LANGUAGE_ENGLISH' | 'LANGUAGE_GERMANY'

type ProfileStateInterface = {
    language: LanguageType | undefined,
    avatar: string | undefined
}

export const initialState: ProfileStateInterface = {
    language: undefined,
    avatar: undefined
}

const setLanguageAction = createAction<string, 'setLanguage'>('setLanguage')
const setAvatarAction = createAction<string, 'setAvatar'>('setAvatar')

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        [setLanguageAction.type]: (state: Draft<ProfileStateInterface>, action: PayloadAction<LanguageType>) => {
            if (action.payload === state.language) {
                state.language = action.payload === LANGUAGE_ENGLISH ? LANGUAGE_GERMANY : LANGUAGE_ENGLISH
            } else {
                state.language = action.payload
            }
        },
        [setAvatarAction.type]: (state: Draft<ProfileStateInterface>, action: PayloadAction<string | undefined>) => {
            state.avatar = action.payload
        }
    }
})

export const { setLanguage, setAvatar } = profileSlice.actions

export default profileSlice.reducer
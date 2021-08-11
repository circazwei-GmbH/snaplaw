import {createAction, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {LANGUAGE_ENGLISH, LANGUAGE_GERMANY} from "./constants";

export type LanguageType = 'LANGUAGE_ENGLISH' | 'LANGUAGE_GERMANY'

type UserType = {

}

type ProfileStateInterface = {
    language: LanguageType | undefined,
    user: UserType | undefined
}

export const initialState: ProfileStateInterface = {
    language: undefined,
    user: undefined
}

const setLanguageAction = createAction<string, 'setLanguage'>('setLanguage')
const setAvatarAction = createAction<string, 'setAvatar'>('setAvatar')
const setUserAction = createAction<UserType, 'setUser'>('setUser')

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
            state.user.avatar = action.payload
        },
        [setUserAction.type]: (state: Draft<ProfileStateInterface>, action: PayloadAction<UserType>) => {
            state.user = action.payload
        }
    }
})

export const { setLanguage, setAvatar, setUser } = profileSlice.actions

export default profileSlice.reducer
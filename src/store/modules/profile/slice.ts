import {createAction, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {LANGUAGE_ENGLISH, LANGUAGE_GERMANY} from "./constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LanguageType = 'LANGUAGE_ENGLISH' | 'LANGUAGE_GERMANY'

type ProfileStateInterface = {
    language: LanguageType
}

const initialState: ProfileStateInterface = {
    language: LANGUAGE_ENGLISH
}

const setLanguageAction = createAction<string, 'setLanguage'>('setLanguage')

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

            AsyncStorage.setItem('lang', state.language)
        }
    }
})

export const { setLanguage } = profileSlice.actions

export default profileSlice.reducer
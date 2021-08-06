import {createAction, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

const LANGUAGE_ENGLISH = 'LANGUAGE_ENGLISH';
const LANGUAGE_GERMANY = 'LANGUAGE_GERMANY';

type ProfileStateInterface = {
    language: 'LANGUAGE_ENGLISH' | 'LANGUAGE_GERMANY'
}

const initialState: ProfileStateInterface = {
    language: LANGUAGE_ENGLISH
}

const setLanguageAction = createAction<string, ''>('')

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        [setLanguageAction.type]: (state: Draft<ProfileStateInterface>, action: PayloadAction<'LANGUAGE_ENGLISH' | 'LANGUAGE_GERMANY'>) => {
            state.language = action.payload
        }
    }
})

export const {} = profileSlice.actions

export default profileSlice.reducer
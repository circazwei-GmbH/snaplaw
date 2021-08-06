import {takeLatest, put, call} from "redux-saga/effects";
import {REQUEST_LANGUAGE, SET_LANGUAGE, SetLanguageAction} from "./action-creators";
import {setMessage} from "../main/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Reduser from './slice'

function* setLanguage({payload} : SetLanguageAction) {
    try {
        yield call(AsyncStorage.setItem, 'lang', payload)
    } catch (error) {
        yield put(setMessage('error.abstract'))
    }
}

function* requestLanguage() {
    try {
        const language = yield call(AsyncStorage.getItem, 'lang')
        yield put(Reduser.setLanguage(language))
    } catch (error) {
        yield put(setMessage('error.abstract'))
    }
}

function* profileSaga() {
    yield takeLatest(SET_LANGUAGE, setLanguage)
    yield takeLatest(REQUEST_LANGUAGE, requestLanguage)
}

export default profileSaga;
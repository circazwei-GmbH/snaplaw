import {takeLatest, put, call} from "redux-saga/effects";
import {REQUEST_LANGUAGE, SET_LANGUAGE, SetLanguageAction, UPLOAD_AVATAR, UploadAvatarAction} from "./action-creators";
import {setMessage} from "../main/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Reduser from './slice'

function* setLanguage({payload} : SetLanguageAction) {
    try {
        yield put(Reduser.setLanguage(payload))
        yield call(AsyncStorage.setItem, 'lang', payload)
    } catch (error) {
        yield put(setMessage('errors.abstract'))
    }
}

function* requestLanguage() {
    try {
        const language = yield call(AsyncStorage.getItem, 'lang')
        yield put(Reduser.setLanguage(language))
    } catch (error) {
        yield put(setMessage('errors.abstract'))
    }
}

function* uploadAvatar({payload}: UploadAvatarAction) {
    try {
        console.log('yay', payload)
    } catch (error) {

    }
}

function* profileSaga() {
    yield takeLatest(SET_LANGUAGE, setLanguage)
    yield takeLatest(REQUEST_LANGUAGE, requestLanguage)
    yield takeLatest(UPLOAD_AVATAR, uploadAvatar)
}

export default profileSaga;
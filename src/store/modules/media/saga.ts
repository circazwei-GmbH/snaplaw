import {UPLOAD_MEDIA, UploadMediaAction} from "./action-creators";
import {call, put, takeLatest} from "redux-saga/effects";
import {setMessage} from "../main/slice";
import {Translator} from "../../../translator/i18n";
import API from '../../../services/media/index'

function* uploadMedia({payload}: UploadMediaAction) {
    try {
        yield call(API.mediaProcess, payload)
    } catch (error) {
        console.log(error.response)
        yield put(setMessage(Translator.getInstance().trans('errors.abstract')))
    }
}

function* mediaSaga() {
    yield takeLatest(UPLOAD_MEDIA, uploadMedia)
}

export default mediaSaga;
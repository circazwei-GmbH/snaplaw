import {UPLOAD_AVATAR, UploadAvatarAction} from "./action-creators";
import {takeLatest} from "redux-saga/effects";

function* uploadAvatar({payload}: UploadAvatarAction) {
    try {
        console.log('yay', payload)
    } catch (error) {

    }
}

function* mediaSaga() {
    yield takeLatest(UPLOAD_AVATAR, uploadAvatar)
}

export default mediaSaga;
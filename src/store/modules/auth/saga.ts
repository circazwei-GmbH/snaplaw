import { call, put, takeLatest } from 'redux-saga/effects'
import {SIGNIN_REQUESTED, SIGNUP_REQUESTED} from "./action-creators";
import {RequestSignInAction, RequestSignUpAction} from "./types";
import API from '../../../services/auth/index'
import { signUpFailed, signInFailed, setToken } from './slice'

function* fetchSignUp(action: RequestSignUpAction) {
    try {
        const response = yield call(API.signUp, action.payload)
        console.log(response)
    } catch (error) {
        if (error.response.data.code === 11000) {
            return yield put(signUpFailed({
                email: 'Email already taken'
            }))
        }
        //TODO: abstract error put to store
        console.error('Saga', error)
    }
}

function* fetchSignIn(action: RequestSignInAction) {
    try {
        const response = yield call(API.signIn, action.payload)
        yield put(setToken(response.data.token))
    } catch (error) {
        if (error.response.data.code === 2) {
            return yield put(signInFailed({
                message: 'Sorry, we can’t find account with this email',
                field: 'email'
            }))
        }
        if (error.response.data.code === 'IUH') {
            return yield put(signInFailed({
                message: 'Password not valid',
                field: 'password'
            }))
        }
        //TODO: abstract error put to store
        console.error('Saga', error.response.data)
    }
}

function* authSaga() {
    yield takeLatest(SIGNUP_REQUESTED, fetchSignUp)
    yield takeLatest(SIGNIN_REQUESTED, fetchSignIn)
}

export default authSaga;
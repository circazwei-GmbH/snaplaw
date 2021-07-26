import { call, put, takeLatest } from 'redux-saga/effects'
import {SIGNIN_REQUESTED, SIGNUP_REQUESTED} from "./action-creators";
import {RequestSignInAction, RequestSignUpAction} from "./types";
import API from '../../../services/auth/index'
import { signUpFailed, signInFailed, setToken, clearSignInErrors } from './slice'
import { setModalMessage } from '../main/slice'
import {ROUTE} from "../../../router/RouterTypes";
import * as RootNavigation from '../../../router/RootNavigation'

function* fetchSignUp(action: RequestSignUpAction) {
    try {
        yield put(signUpFailed({
            email: ''
        }))
        // yield call(API.signUp, action.payload)
        RootNavigation.navigate(ROUTE.VERIFICATION, {email: action.payload.email})
    } catch (error) {
        console.log(typeof error)
        if (error.response?.data?.code === 11000) {
            return yield put(signUpFailed({
                email: 'Email already taken'
            }))
        }
        yield put(setModalMessage(
            'error.abstract'
        ))
    }
}

function* fetchSignIn(action: RequestSignInAction) {
    try {
        yield put(clearSignInErrors())
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
        yield put(setModalMessage(
            'error.abstract'
        ))
    }
}

function* authSaga() {
    yield takeLatest(SIGNUP_REQUESTED, fetchSignUp)
    yield takeLatest(SIGNIN_REQUESTED, fetchSignIn)
}

export default authSaga;
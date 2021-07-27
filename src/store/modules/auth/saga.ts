import { call, put, takeLatest } from 'redux-saga/effects'
import {
    SIGNIN_REQUESTED,
    SIGNUP_REQUESTED,
    VERIFICATION_REQUESTED,
    VERIFICATION_RESEND_REQUESTED
} from "./action-creators";
import {RequestSignInAction, RequestSignUpAction, VerificationAction, VerificationResendAction} from "./types";
import API from '../../../services/auth/index'
import { signUpFailed, signInFailed, setToken, clearSignInErrors, verificationFailed } from './slice'
import { setMessage } from '../main/slice'
import {ROUTE} from "../../../router/RouterTypes";
import * as RootNavigation from '../../../router/RootNavigation'
import {
    EMAIL_NOT_CONFIRMED,
    PASSWORD_NOT_VALID,
    USER_NOT_FOUND,
    USER_NOT_FOUND_LOGIN,
    USER_NOT_UNIQUE, VERIFICATION_CODE_IS_INCORRECT
} from "../../../services/error-codes";

function* fetchSignUp(action: RequestSignUpAction) {
    try {
        yield put(signUpFailed({
            email: ''
        }))
        yield call(API.signUp, action.payload)
        RootNavigation.navigate(ROUTE.VERIFICATION, {email: action.payload.email})
    } catch (error) {
        if (error.response?.data.code === USER_NOT_UNIQUE) {
            return yield put(signUpFailed({
                email: 'Email already taken'
            }))
        }
        yield put(setMessage(
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
        if (error.response?.data.code === USER_NOT_FOUND_LOGIN) {
            return yield put(signInFailed({
                message: 'Sorry, we can’t find account with this email',
                field: 'email'
            }))
        }
        if (error.response?.data.code === PASSWORD_NOT_VALID) {
            return yield put(signInFailed({
                message: 'Password not valid',
                field: 'password'
            }))
        }
        if (error.response?.data.code === EMAIL_NOT_CONFIRMED) {
            return RootNavigation.navigate(ROUTE.VERIFICATION, {email: action.payload.email})
        }
        yield put(setMessage(
            'error.abstract'
        ))
    }
}

function* fetchVerification(action: VerificationAction) {
    try {
        const response = yield call(API.verification, action.payload)
        yield put(setToken(response.data.token))
    } catch (error) {
        if (error.response?.data.code === USER_NOT_FOUND) {
            return yield put(verificationFailed('User not found'))
        }
        if (error.response?.data.code === VERIFICATION_CODE_IS_INCORRECT) {
            return yield put(verificationFailed('Code incorrect'))
        }
        yield put(setMessage(
            'error.abstract'
        ))
    }
}

function* fetchResendVerificationCode(action: VerificationResendAction) {
    try {
        yield call(API.resendVerification, action.payload)
    } catch (error) {
        yield put(setMessage('error.abstract'))
    }
}

function* authSaga() {
    yield takeLatest(SIGNUP_REQUESTED, fetchSignUp)
    yield takeLatest(SIGNIN_REQUESTED, fetchSignIn)
    yield takeLatest(VERIFICATION_REQUESTED, fetchVerification)
    yield takeLatest(VERIFICATION_RESEND_REQUESTED, fetchResendVerificationCode)
}

export default authSaga;
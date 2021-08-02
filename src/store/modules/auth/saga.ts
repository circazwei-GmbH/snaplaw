import { call, put, takeLatest } from 'redux-saga/effects'
import {
    requestVerificationResend,
    SIGNIN_REQUESTED,
    SIGNUP_REQUESTED,
    VERIFICATION_REQUESTED,
    VERIFICATION_RESEND_REQUESTED
} from "./action-creators";
import {RequestSignInAction, RequestSignUpAction, VerificationAction, VerificationResendAction} from "./types";
import API from '../../../services/auth/index'
import { signUpFailed, signInFailed, setToken, clearSignInErrors, verificationFailed } from './slice'
import { setMessage, setModal } from '../main/slice'
import {ROUTE} from "../../../router/RouterTypes";
import * as RootNavigation from '../../../router/RootNavigation'
import {
    EMAIL_NOT_CONFIRMED,
    PASSWORD_NOT_VALID,
    USER_NOT_FOUND,
    USER_NOT_FOUND_LOGIN,
    USER_NOT_UNIQUE, VERIFICATION_CODE_IS_INCORRECT
} from "../../../services/error-codes";
import { t } from 'i18n-js'

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
                email: t('sign_up.errors.email_taken')
            }))
        }
        yield put(setMessage(
            t('errors.abstract')
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
                message: t('sign_in.errors.user_not_found'),
                field: 'email'
            }))
        }
        if (error.response?.data.code === PASSWORD_NOT_VALID) {
            return yield put(signInFailed({
                message: t('sign_in.errors.password_not_valid'),
                field: 'password'
            }))
        }
        if (error.response?.data.code === EMAIL_NOT_CONFIRMED) {
            return RootNavigation.navigate(ROUTE.VERIFICATION, {email: action.payload.email})
        }
        yield put(setMessage(
            t('errors.abstract')
        ))
    }
}

function* fetchVerification(action: VerificationAction) {
    try {
        const response = yield call(API.verification, action.payload)
        yield put(setToken(response.data.token))
    } catch (error) {
        if (error.response?.data.code === USER_NOT_FOUND) {
            return yield put(verificationFailed(t('verification.errors.user_not_found')))
        }
        if (error.response?.data.code === VERIFICATION_CODE_IS_INCORRECT) {
            return yield put(setModal({
                message: t('verification.modals.confirm.text'),
                actions: [
                    {
                        name: t('verification.modals.confirm.buttons.no'),
                        colortype: 'error'
                    },
                    {
                        name: t('verification.modals.confirm.buttons.yes'),
                        colortype: 'primary',
                        action: requestVerificationResend(action.payload.email)
                    }
                ]
            }))
        }
        yield put(setMessage(
            t('errors.abstract')
        ))
    }
}

function* fetchResendVerificationCode(action: VerificationResendAction) {
    try {
        yield call(API.resendVerification, action.payload)
        yield put(setMessage(t('verification.modals.information.text')))
    } catch (error) {
        yield put(setMessage(t('errors.abstract')))
    }
}

function* authSaga() {
    yield takeLatest(SIGNUP_REQUESTED, fetchSignUp)
    yield takeLatest(SIGNIN_REQUESTED, fetchSignIn)
    yield takeLatest(VERIFICATION_REQUESTED, fetchVerification)
    yield takeLatest(VERIFICATION_RESEND_REQUESTED, fetchResendVerificationCode)
}

export default authSaga;
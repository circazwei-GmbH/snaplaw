import {
    ChangePasswordAction, ClearTokenAction,
    ForgotPasswordAction,
    RequestSignInAction,
    RequestSignUpAction, RequestTokenAction, ResponseErrorAction, SaveTokenAction,
    VerificationAction,
    VerificationResendAction
} from "./types";

export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const SIGNIN_REQUESTED = 'SIGNIN_REQUESTED';
export const VERIFICATION_REQUESTED = 'VERIFICATION_REQUESTED';
export const VERIFICATION_RESEND_REQUESTED = 'VERIFICATION_RESEND_REQUESTED';
export const FORGOT_PASSWORD_REQUESTED = 'FORGOT_PASSWORD_REQUESTED';
export const CHANGE_PASSWORD_REQUESTED = 'CHANGE_PASSWORD_REQUESTED';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';
export const RESPONSE_ERROR = 'RESPONSE_ERROR';

export const requestSignUp = (name: string, email: string, password: string): RequestSignUpAction => ({
    type: SIGNUP_REQUESTED,
    payload: { name, email, password },
})

export const requestSignIn = (email: string, password: string): RequestSignInAction => ({
    type: SIGNIN_REQUESTED,
    payload: { email, password }
})

export const requestVerification = (code: string, email: string, to: string): VerificationAction => ({
    type: VERIFICATION_REQUESTED,
    payload: { code, email, to }
})

export const requestVerificationResend = (email: string): VerificationResendAction => ({
    type: VERIFICATION_RESEND_REQUESTED,
    payload: { email }
})

export const requestForgotPassword = (email: string): ForgotPasswordAction => ({
    type: FORGOT_PASSWORD_REQUESTED,
    payload: { email }
})

export const requestChangePassword = (token: string, refresh: string, password: string): ChangePasswordAction => ({
    type: CHANGE_PASSWORD_REQUESTED,
    payload: { token, password, refresh }
})

export const saveToken = (token: string, refresh: string): SaveTokenAction => ({
    type: SAVE_TOKEN,
    payload: {
        token,
        refresh
    }
})

export const requestToken = (): RequestTokenAction => ({
    type: REQUEST_TOKEN,
    payload: undefined
})

export const clearToken = (): ClearTokenAction => ({
    type: CLEAR_TOKEN,
    payload: undefined
})

export const responseError = (error: any): ResponseErrorAction => {
    if (!error.response) {
        console.error('ERROR', error.message)
        return {
            type: RESPONSE_ERROR,
            payload: undefined
        }
    }
    return {
        type: RESPONSE_ERROR,
        payload: {
            status: error.response.status,
            data: error.response.data
        }
    }
}


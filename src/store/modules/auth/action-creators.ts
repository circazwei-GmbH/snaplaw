import {RequestSignInAction, RequestSignUpAction, VerificationAction, VerificationResendAction} from "./types";

export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const SIGNIN_REQUESTED = 'SIGNIN_REQUESTED';
export const VERIFICATION_REQUESTED = 'VERIFICATION_REQUESTED';
export const VERIFICATION_RESEND_REQUESTED = 'VERIFICATION_RESEND_REQUESTED';

export const requestSignUp = (name: string, email: string, password: string): RequestSignUpAction => {
    return {
        type: SIGNUP_REQUESTED,
        payload: { name, email, password },
    }
}

export const requestSignIn = (email: string, password: string): RequestSignInAction => ({
    type: SIGNIN_REQUESTED,
    payload: { email, password }
})

export const requestVerification = (code: string, email: string): VerificationAction => ({
    type: VERIFICATION_REQUESTED,
    payload: { code, email }
})

export const requestVerificationResend = (email: string): VerificationResendAction => ({
    type: VERIFICATION_RESEND_REQUESTED,
    payload: { email }
})
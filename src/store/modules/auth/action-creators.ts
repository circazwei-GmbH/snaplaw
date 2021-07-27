import {RequestSignInAction, RequestSignUpAction} from "./types";

export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const SIGNIN_REQUESTED = 'SIGNIN_REQUESTED'

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
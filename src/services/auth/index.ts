import {
    SignInPayload,
    SignUpPayload,
    VerificationPayload,
    VerificationResendPayload
} from "../../store/modules/auth/types";
import httpClient from '../api'

const signUp = (payload: SignUpPayload) => {
    return httpClient.post('signup', payload)
}

const signIn = (payload: SignInPayload) => {
    return httpClient.post('login', payload)
}

const verification = (payload: VerificationPayload) => {
    return httpClient.post('confirm-email', payload)
}

const resendVerification = (payload: VerificationResendPayload) => {
    return httpClient.post('resent-email-confirmation', payload)
}

export default {
    signUp,
    signIn,
    verification,
    resendVerification
}
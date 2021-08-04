import {
    ChangePasswordPayload,
    ForgotPasswordPayload,
    SignInPayload,
    SignUpPayload,
    VerificationPayload,
    VerificationResendPayload
} from "../../store/modules/auth/types";
import httpClient from '../api'

const signUp = (payload: SignUpPayload) => {
    return httpClient.post('signup', {...payload, locale: 'en'})
}

const signIn = (payload: SignInPayload) => {
    return httpClient.post('login', payload)
}

const verification = (payload: VerificationPayload) => {
    return httpClient.post('confirm-email', payload)
}

const resendVerification = (payload: VerificationResendPayload) => {
    return httpClient.post('resent-email-confirmation', {...payload, locale: 'en'})
}

const forgotPassword = (payload: ForgotPasswordPayload) => {
    return httpClient.post('reset-password-confirmation', {...payload, locale: 'en'})
}

const changePassword = ({ password, token }: ChangePasswordPayload) => {
    return httpClient.post('set-new-password', { password }, {
        headers: {
            Authorization: token
        }
    })
}

export default {
    signUp,
    signIn,
    verification,
    resendVerification,
    forgotPassword,
    changePassword
}
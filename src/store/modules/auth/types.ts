interface BaseAction {
    type: string,
    payload: any
}

export interface SignUpPayload {
    name: string,
    email: string,
    password: string,
}

export interface SignInPayload {
    email: string,
    password: string,
}

export interface VerificationPayload {
    email: string,
    code: string
}

export interface VerificationResendPayload {
    email: string
}

export interface ForgotPasswordPayload {
    email: string
}

export interface RequestSignUpAction extends BaseAction {
    payload: SignUpPayload
}

export interface RequestSignInAction extends BaseAction {
    payload: SignInPayload
}

export interface VerificationAction extends BaseAction {
    payload: VerificationPayload
}

export interface VerificationResendAction extends BaseAction {
    payload: VerificationResendPayload
}

export interface ForgotPasswordAction extends BaseAction {
    payload: ForgotPasswordPayload
}
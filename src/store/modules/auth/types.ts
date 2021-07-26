interface BaseAction {
    type: string,
    payload: any
}

export interface SignUpPayload {
    name: string,
    email: string,
    password: string
}

export interface RequestSignUpAction extends BaseAction {
    payload: SignUpPayload
}

export interface SignInPayload {
    email: string,
    password: string,
}

export interface RequestSignInAction extends BaseAction {
    payload: SignInPayload
}
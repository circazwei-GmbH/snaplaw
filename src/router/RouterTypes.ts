interface RouterConst {
    WELCOME: "Welcome",
    SIGNIN: "SignIn",
    SIGNUP: "SignUp",
    FORGOT: "Forgot",
    VERIFICATION: "Verification",
    CHANGE_PASSWORD: 'ChangePassword'
}

export const ROUTE: RouterConst = {
    WELCOME: 'Welcome',
    SIGNIN: 'SignIn',
    SIGNUP: 'SignUp',
    FORGOT: 'Forgot',
    VERIFICATION: 'Verification',
    CHANGE_PASSWORD: 'ChangePassword'
}

export type RootStackParamList = {
    [ROUTE.WELCOME]: undefined,
    [ROUTE.SIGNIN]: undefined,
    [ROUTE.SIGNUP]: undefined,
    [ROUTE.FORGOT]: undefined,
    [ROUTE.VERIFICATION]: {email: string, to: string},
    [ROUTE.CHANGE_PASSWORD]: undefined
}
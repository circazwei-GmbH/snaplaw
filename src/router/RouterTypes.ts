interface RouterConst {
    WELCOME: "Welcome",
    SIGNIN: "SignIn",
    SIGNUP: "SignUp",
    FORGOT: "Forgot",
    VERIFICATION: "Verification",
}

export const ROUTE: RouterConst = {
    WELCOME: 'Welcome',
    SIGNIN: 'SignIn',
    SIGNUP: 'SignUp',
    FORGOT: 'Forgot',
    VERIFICATION: 'Verification'
}

export type RootStackParamList = {
    [ROUTE.WELCOME]: undefined,
    [ROUTE.SIGNIN]: undefined,
    [ROUTE.SIGNUP]: undefined,
    [ROUTE.FORGOT]: undefined,
    [ROUTE.VERIFICATION]: {email: string}
}
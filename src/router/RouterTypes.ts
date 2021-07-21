interface RouterConst {
    WELCOME: "Welcome",
    SIGNIN: "SignIn",
    SIGNUP: "SignUp",
    FORGOT: "Forgot"
}

export const ROUTE: RouterConst = {
    WELCOME: 'Welcome',
    SIGNIN: 'SignIn',
    SIGNUP: 'SignUp',
    FORGOT: 'Forgot'
}

export type RootStackParamList = {
    [ROUTE.WELCOME]: undefined,
    [ROUTE.SIGNIN]: undefined,
    [ROUTE.SIGNUP]: undefined,
    [ROUTE.FORGOT]: undefined
}
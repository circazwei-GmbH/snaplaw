interface AuthRouterConst {
  WELCOME: "Welcome";
  SIGNIN: "SignIn";
  SIGNUP: "SignUp";
  FORGOT: "Forgot";
  VERIFICATION: "Verification";
  CHANGE_PASSWORD: "ChangePassword";
}

export const AUTH_ROUTE: AuthRouterConst = {
  WELCOME: "Welcome",
  SIGNIN: "SignIn",
  SIGNUP: "SignUp",
  FORGOT: "Forgot",
  VERIFICATION: "Verification",
  CHANGE_PASSWORD: "ChangePassword",
};

export type RootStackParamList = {
  [AUTH_ROUTE.WELCOME]: undefined;
  [AUTH_ROUTE.SIGNIN]: undefined;
  [AUTH_ROUTE.SIGNUP]: undefined;
  [AUTH_ROUTE.FORGOT]: undefined;
  [AUTH_ROUTE.VERIFICATION]: { email: string; to: string };
  [AUTH_ROUTE.CHANGE_PASSWORD]: undefined;
};

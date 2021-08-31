// TODO: move to abstract
export interface BaseAction {
  type: string;
  payload: any;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface VerificationPayload {
  email: string;
  code: string;
  to: string;
}

export interface VerificationResendPayload {
  email: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ChangePasswordPayload {
  password: string;
  token: string;
  refresh: string;
}

export type SaveTokenPayload = {
  token: string;
  refresh: string;
};

export interface RequestSignUpAction extends BaseAction {
  payload: SignUpPayload;
}

export interface RequestSignInAction extends BaseAction {
  payload: SignInPayload;
}

export interface VerificationAction extends BaseAction {
  payload: VerificationPayload;
}

export interface VerificationResendAction extends BaseAction {
  payload: VerificationResendPayload;
}

export interface ForgotPasswordAction extends BaseAction {
  payload: ForgotPasswordPayload;
}

export interface ChangePasswordAction extends BaseAction {
  payload: ChangePasswordPayload;
}

export interface SaveTokenAction extends BaseAction {
  payload: SaveTokenPayload;
}

export interface RequestTokenAction extends BaseAction {
  payload: undefined;
}

export interface ClearTokenAction extends BaseAction {
  payload: undefined;
}

export interface ResponseErrorAction extends BaseAction {
  payload:
    | {
        status: number;
        data: any;
      }
    | undefined;
}

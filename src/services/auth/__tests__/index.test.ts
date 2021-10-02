import API from "../index";
import httpClient from "../../api";
import {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  SignInPayload,
  SignUpPayload,
  VerificationResendPayload,
} from "../../../store/modules/auth/types";
import { Translator } from "../../../translator/i18n";
import { LANGUAGE_GERMANY } from "../../../store/modules/profile/constants";
jest.mock("../../api.ts");

const SIGNUP_DATA: SignUpPayload = {
  name: "test",
  email: "some-email",
  password: "password",
};

const SIGNIN_DATA: SignInPayload = {
  email: "test",
  password: "password",
};

const VERIFICATION_DATA = {
  email: "test-email",
  code: "2345",
};

const RESEND_VERIFICATION_DATA: VerificationResendPayload = {
  email: "test",
};

const FORGOT_PASSWORD_DATA: ForgotPasswordPayload = {
  email: "test-mail",
};

const CHANGE_PASSWORD_DATA: ChangePasswordPayload = {
  password: "new-password",
  token: "token",
};

describe("Auth serves", () => {
  it("Sign up action", () => {
    API.signUp(SIGNUP_DATA);
    expect(httpClient.post).toBeCalledWith("signup", {
      ...SIGNUP_DATA,
      locale: "en",
    });
  });
  it("Login action", () => {
    API.signIn(SIGNIN_DATA);
    expect(httpClient.post).toBeCalledWith("login", SIGNIN_DATA);
  });
  it("Verification action", () => {
    API.verification(VERIFICATION_DATA);
    expect(httpClient.post).toBeCalledWith("confirm-email", VERIFICATION_DATA);
  });
  it("Resend Verification action", () => {
    API.resendVerification(RESEND_VERIFICATION_DATA);
    expect(httpClient.post).toBeCalledWith("resent-email-confirmation", {
      ...RESEND_VERIFICATION_DATA,
      locale: "en",
    });
  });
  it("Forgot password action", () => {
    Translator.getInstance().setLanguage(LANGUAGE_GERMANY);
    API.forgotPassword(FORGOT_PASSWORD_DATA);
    expect(httpClient.post).toBeCalledWith("reset-password-confirmation", {
      ...FORGOT_PASSWORD_DATA,
      locale: "de",
    });
  });
  it("Change password action", () => {
    API.changePassword(CHANGE_PASSWORD_DATA);
    expect(httpClient.post).toBeCalledWith(
      "set-new-password",
      { password: CHANGE_PASSWORD_DATA.password },
      {
        headers: {
          Authorization: `Bearer token`,
        },
      }
    );
  });
});

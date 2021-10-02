import {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  SignInPayload,
  SignUpPayload,
  VerificationResendPayload,
} from "../../store/modules/auth/types";
import httpClient from "../api";
import { Translator } from "../../translator/i18n";
import { LANGUAGE_ENGLISH } from "../../store/modules/profile/constants";

const mutatePayloadWithLocale = (payload: any) => {
  return {
    ...payload,
    locale:
      Translator.getInstance().getLanguage() === LANGUAGE_ENGLISH ? "en" : "de",
  };
};

const signUp = (payload: SignUpPayload) => {
  return httpClient.post("signup", mutatePayloadWithLocale(payload));
};

const signIn = (payload: SignInPayload) => {
  return httpClient.post("login", payload);
};

const verification = (payload: { email: string; code: string }) => {
  return httpClient.post("confirm-email", payload);
};

const resendVerification = (payload: VerificationResendPayload) => {
  return httpClient.post(
    "resent-email-confirmation",
    mutatePayloadWithLocale(payload)
  );
};

const forgotPassword = (payload: ForgotPasswordPayload) => {
  return httpClient.post(
    "reset-password-confirmation",
    mutatePayloadWithLocale(payload)
  );
};

const changePassword = ({ password, token }: ChangePasswordPayload) => {
  return httpClient.post(
    "set-new-password",
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default {
  signUp,
  signIn,
  verification,
  resendVerification,
  forgotPassword,
  changePassword,
};

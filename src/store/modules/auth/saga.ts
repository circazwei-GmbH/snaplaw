import { call, put, takeLatest } from "redux-saga/effects";
import {
  CHANGE_PASSWORD_REQUESTED,
  CLEAR_TOKEN,
  clearToken as clearTokenAction,
  FORGOT_PASSWORD_REQUESTED,
  REQUEST_TOKEN,
  requestVerificationResend,
  RESPONSE_ERROR,
  responseError,
  SAVE_TOKEN,
  saveToken,
  SIGNIN_REQUESTED,
  SIGNUP_REQUESTED,
  VERIFICATION_REQUESTED,
  VERIFICATION_RESEND_REQUESTED,
} from "./action-creators";
import {
  ChangePasswordAction,
  ForgotPasswordAction,
  RequestSignInAction,
  RequestSignUpAction,
  ResponseErrorAction,
  SaveTokenAction,
  VerificationAction,
  VerificationResendAction,
} from "./types";
import API from "../../../services/auth/index";
import {
  changePasswordFailed,
  clearSignInErrors,
  forgotPasswordFailed,
  killToken,
  setToken,
  signInFailed,
  signUpFailed,
  verificationFailed,
} from "./slice";
import { setMessage, setModal } from "../main/slice";
import { AUTH_ROUTE } from "../../../router/AuthRouterTypes";
import * as RootNavigation from "../../../router/RootNavigation";
import {
  EMAIL_NOT_CONFIRMED,
  NEW_PASSWORD_SAME_AS_OLD,
  PASSWORD_NOT_VALID,
  USER_NOT_FOUND,
  USER_NOT_FOUND_LOGIN,
  USER_NOT_UNIQUE,
  VERIFICATION_CODE_IS_INCORRECT,
} from "../../../services/error-codes";
import { Translator } from "../../../translator/i18n";
import BaseApi from "../../../services/api";
import { requestMe } from "../profile/action-creators";
import {
  clearAuthTokens,
  getAuthTokens,
  setAuthTokens,
} from "../../../services/auth/tokens";
import { BUTTON_COLORTYPE } from "../main/types";
import { clearUser } from "../profile/slice";
import {clearNotificationModule} from "../notifications/slice";

function* fetchSignUp(action: RequestSignUpAction) {
  try {
    yield put(
      signUpFailed({
        email: "",
      })
    );
    yield call(API.signUp, action.payload);
    RootNavigation.navigate(AUTH_ROUTE.VERIFICATION, {
      email: action.payload.email,
    });
  } catch (error) {
    if (error.response?.data.code === USER_NOT_UNIQUE) {
      return yield put(
        signUpFailed({
          email: Translator.getInstance().trans("sign_up.errors.email_taken"),
        })
      );
    }
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* fetchSignIn(action: RequestSignInAction) {
  try {
    yield put(clearSignInErrors());
    const response = yield call(API.signIn, action.payload);
    yield put(saveToken(response.data.token, response.data.refreshToken));
  } catch (error) {
    if (error.response?.data.code === USER_NOT_FOUND_LOGIN) {
      return yield put(
        signInFailed({
          message: Translator.getInstance().trans(
            "sign_in.errors.user_not_found"
          ),
          field: "email",
        })
      );
    }
    if (error.response?.data.code === PASSWORD_NOT_VALID) {
      return yield put(
        signInFailed({
          message: Translator.getInstance().trans(
            "sign_in.errors.password_not_valid"
          ),
          field: "password",
        })
      );
    }
    if (error.response?.data.code === EMAIL_NOT_CONFIRMED) {
      return RootNavigation.navigate(AUTH_ROUTE.VERIFICATION, {
        email: action.payload.email,
      });
    }
    yield put(responseError(error));
  }
}

function* fetchVerification(action: VerificationAction) {
  try {
    const response = yield call(API.verification, {
      code: action.payload.code,
      email: action.payload.email,
    });
    if (action.payload.to === AUTH_ROUTE.CHANGE_PASSWORD) {
      return RootNavigation.navigate(action.payload.to, {
        email: action.payload.email,
        token: response.data.token,
        refresh: response.data.refreshToken,
      });
    }
    yield put(saveToken(response.data.token, response.data.refreshToken));
  } catch (error) {
    if (error.response?.data.code === USER_NOT_FOUND) {
      return yield put(
        verificationFailed(
          Translator.getInstance().trans("verification.errors.user_not_found")
        )
      );
    }
    if (error.response?.data.code === VERIFICATION_CODE_IS_INCORRECT) {
      return yield put(
        setModal({
          message: Translator.getInstance().trans(
            "verification.modals.confirm.text"
          ),
          actions: [
            {
              name: Translator.getInstance().trans(
                "verification.modals.confirm.buttons.no"
              ),
              colortype: BUTTON_COLORTYPE.ERROR,
            },
            {
              name: Translator.getInstance().trans(
                "verification.modals.confirm.buttons.yes"
              ),
              colortype: BUTTON_COLORTYPE.PRIMARY,
              action: requestVerificationResend(action.payload.email),
            },
          ],
        })
      );
    }
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* fetchResendVerificationCode(action: VerificationResendAction) {
  try {
    yield call(API.resendVerification, action.payload);
    yield put(
      setMessage(
        Translator.getInstance().trans("verification.modals.information.text")
      )
    );
  } catch (error) {
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* fetchForgotPassword(action: ForgotPasswordAction) {
  try {
    yield put(forgotPasswordFailed(""));
    yield call(API.forgotPassword, action.payload);
    RootNavigation.navigate(AUTH_ROUTE.VERIFICATION, {
      email: action.payload.email,
      to: AUTH_ROUTE.CHANGE_PASSWORD,
    });
  } catch (error) {
    if (error.response.status === 404) {
      return yield put(
        forgotPasswordFailed(
          Translator.getInstance().trans(
            "forgot_password.errors.email_not_fount"
          )
        )
      );
    }
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* fetchChangePassword({ payload }: ChangePasswordAction) {
  try {
    yield call(API.changePassword, payload);
    yield put(setToken(payload));
    yield call(BaseApi.setToken, payload.token, payload.refresh);
  } catch (error) {
    if (error.response?.data.code === NEW_PASSWORD_SAME_AS_OLD) {
      return yield put(
        changePasswordFailed(
          Translator.getInstance().trans(
            "change_password.errors.new_password_are_same_as_old"
          )
        )
      );
    }
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* saveTokenHandler({ payload }: SaveTokenAction) {
  try {
    yield call(setAuthTokens, payload.token, payload.refresh);
    yield put(setToken(payload));
    yield call(BaseApi.setToken, payload.token, payload.refresh);
    yield put(requestMe());
  } catch (error) {
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* requestTokenHandler() {
  try {
    const { token, refresh } = yield call(getAuthTokens);

    if (!token || !refresh) {
      return;
    }
    yield put(setToken(token));
    yield call(BaseApi.setToken, token, refresh);
    yield put(requestMe());
  } catch (error) {
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* clearToken() {
  try {
    yield call(clearAuthTokens);
    yield put(killToken());
    yield put(clearUser());
    yield put(clearNotificationModule());
    yield call(BaseApi.setToken, undefined, undefined);
  } catch (error) {
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* responseErrorHandler({ payload }: ResponseErrorAction) {
  if (!payload) {
    console.error("ERROR without body");
    return yield put(
      setMessage(Translator.getInstance().trans("errors.abstract"))
    );
  }
  if (payload.status === 401 || payload.data?.code === USER_NOT_FOUND) {
    console.error("token expired");
    return yield put(clearTokenAction());
  }
  yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  console.error("ERROR", payload);
}

function* authSaga() {
  yield takeLatest(SIGNUP_REQUESTED, fetchSignUp);
  yield takeLatest(SIGNIN_REQUESTED, fetchSignIn);
  yield takeLatest(VERIFICATION_REQUESTED, fetchVerification);
  yield takeLatest(VERIFICATION_RESEND_REQUESTED, fetchResendVerificationCode);
  yield takeLatest(FORGOT_PASSWORD_REQUESTED, fetchForgotPassword);
  yield takeLatest(CHANGE_PASSWORD_REQUESTED, fetchChangePassword);
  yield takeLatest(SAVE_TOKEN, saveTokenHandler);
  yield takeLatest(REQUEST_TOKEN, requestTokenHandler);
  yield takeLatest(CLEAR_TOKEN, clearToken);
  yield takeLatest(RESPONSE_ERROR, responseErrorHandler);
}

export default authSaga;

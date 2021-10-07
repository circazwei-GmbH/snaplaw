import { takeLatest, put, call } from "redux-saga/effects";
import {
  DELETE_AVATAR,
  REQUEST_LANGUAGE,
  REQUEST_ME,
  SET_LANGUAGE,
  SetLanguageAction,
  UPDATE_AVATAR,
  UpdateAvatarAction,
  REQUEST_EDIT_PROFILE,
  RequestEditProfileAction,
  RequestUserProfileAction,
  REQUEST_USER_PROFILE,
} from "./action-creators";
import { addToWaiter, removeFromWaiter, setMessage } from "../main/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Reduser from "./slice";
import { Translator } from "../../../translator/i18n";
import {
  setAvatar,
  setAvatarLoading,
  setCurretnPartner,
  setUser,
  setUserProfile,
} from "./slice";
import API from "../../../services/profile/index";
import { LANGUAGE_ENGLISH } from "./constants";
import { responseError } from "../auth/action-creators";

function* setLanguage({ payload }: SetLanguageAction) {
  try {
    yield put(Reduser.setLanguage(payload));
    yield call(AsyncStorage.setItem, "lang", payload);
  } catch (error) {
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* requestLanguage() {
  try {
    const language = yield call(AsyncStorage.getItem, "lang");
    yield put(Reduser.setLanguage(language || LANGUAGE_ENGLISH));
  } catch (error) {
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* updateAvatar({ payload }: UpdateAvatarAction) {
  try {
    yield call(API.updateUserAvatar, payload);
    yield put(setAvatar(payload));
    yield put(setAvatarLoading(false));
  } catch (error) {
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* deleteAvatar() {
  try {
    yield call(API.updateUserAvatar, null);
    yield put(setAvatar(null));
  } catch (error) {
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* requestMe() {
  try {
    const user = yield call(API.requestMe);
    yield put(setUser(user.data));
  } catch (error) {
    yield put(responseError(error));
  }
}

function* requestEditProfile({ payload }: RequestEditProfileAction) {
  try {
    yield call(API.editProfileSaveChange, payload);
    yield put(setUserProfile(payload));
  } catch (error) {
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* requestUserProfile({ payload }: RequestUserProfileAction) {
  yield put(addToWaiter(REQUEST_USER_PROFILE));
  try {
    const user = yield call(API.requestUserProfile, payload);
    yield put(setCurretnPartner(user.data.user));
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(removeFromWaiter(REQUEST_USER_PROFILE));
  }
}

function* profileSaga() {
  yield takeLatest(SET_LANGUAGE, setLanguage);
  yield takeLatest(REQUEST_LANGUAGE, requestLanguage);
  yield takeLatest(UPDATE_AVATAR, updateAvatar);
  yield takeLatest(DELETE_AVATAR, deleteAvatar);
  yield takeLatest(REQUEST_ME, requestMe);
  yield takeLatest(REQUEST_EDIT_PROFILE, requestEditProfile);
  yield takeLatest(REQUEST_USER_PROFILE, requestUserProfile);
}

export default profileSaga;

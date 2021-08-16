import { LanguageType, UserType } from "./slice";
import { BaseAction } from "../auth/types";

export const SET_LANGUAGE = "SET_LANGUAGE";
export const REQUEST_LANGUAGE = "REQUEST_LANGUAGE";
export const UPDATE_AVATAR = "UPDATE_AVATAR";
export const DELETE_AVATAR = "DELETE_AVATAR";
export const REQUEST_ME = "REQUEST_ME";
export const REQUEST_EDIT_PROFILE = "REQUEST_EDIT_PROFILE";
export const SAVE_BUTTON_EDIT_PROFILE_MODAL = "SAVE_BUTTON_EDIT_PROFILE_MODAL";
export const SAVE_BUTTON_EDIT_PROFILE = "SAVE_BUTTON_EDIT_PROFILE";
export const CANCEL_BUTTON_EDIT_PROFILE_MODAL =
  "CANCEL_BUTTON_EDIT_PROFILE_MODAL";
export const CANCEL_BUTTON_EDIT_PROFILE = "CANCEL_BUTTON_EDIT_PROFILE";

export interface SetLanguageAction extends BaseAction {
  payload: LanguageType;
}

export interface RequestLanguageAction extends BaseAction {
  payload: undefined;
}

export interface UpdateAvatarAction extends BaseAction {
  payload: null | string;
}

export interface DeleteAvatarAction extends BaseAction {
  payload: undefined;
}

export interface RequestMeAction extends BaseAction {
  payload: undefined;
}

export interface RequestEditProfileAction extends BaseAction {
  payload: UserType;
}

export interface SaveButtonEditProfileAction extends BaseAction {
  payload: object;
}

export interface CancelButtonEditProfileAction extends BaseAction {
  payload: undefined;
}

export const setLanguage = (language: LanguageType): SetLanguageAction => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const requestLanguage = (): RequestLanguageAction => ({
  type: REQUEST_LANGUAGE,
  payload: undefined,
});

export const updateAvatar = (uri: string): UpdateAvatarAction => ({
  type: UPDATE_AVATAR,
  payload: uri,
});

export const deleteAvatar = (): DeleteAvatarAction => ({
  type: DELETE_AVATAR,
  payload: undefined,
});

export const requestMe = (): RequestMeAction => ({
  type: REQUEST_ME,
  payload: undefined,
});

export const requestEditProfile = (
  user: UserType
): RequestEditProfileAction => ({
  type: REQUEST_EDIT_PROFILE,
  payload: user,
});

export const saveButtonEditProfile = (
  formData: object
): SaveButtonEditProfileAction => ({
  type: SAVE_BUTTON_EDIT_PROFILE,
  payload: formData,
});

export const saveButtonEditProfileModal = (
  user: UserType
): SaveButtonEditProfileAction => ({
  type: SAVE_BUTTON_EDIT_PROFILE_MODAL,
  payload: user,
});

export const cancelButtonEditProfile = (): CancelButtonEditProfileAction => ({
  type: CANCEL_BUTTON_EDIT_PROFILE,
  payload: undefined,
});

export const cancelButtonEditProfileModal = (): RequestMeAction => ({
  type: CANCEL_BUTTON_EDIT_PROFILE_MODAL,
  payload: undefined,
});

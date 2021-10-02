import { LanguageType, UserType } from "./slice";
import { BaseAction } from "../auth/types";
import { MediaType } from "../../../services/media";

export const SET_LANGUAGE = "SET_LANGUAGE";
export const REQUEST_LANGUAGE = "REQUEST_LANGUAGE";
export const UPDATE_AVATAR = "UPDATE_AVATAR";
export const DELETE_AVATAR = "DELETE_AVATAR";
export const REQUEST_ME = "REQUEST_ME";
export const REQUEST_EDIT_PROFILE = "REQUEST_EDIT_PROFILE";
export const REQUEST_USER_PROFILE = "REQUEST_USER_PROFILE";

export interface SetLanguageAction extends BaseAction {
  payload: LanguageType;
}

export interface RequestLanguageAction extends BaseAction {
  payload: undefined;
}

export interface UpdateAvatarAction extends BaseAction {
  payload: null | MediaType;
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

export interface RequestUserProfileAction extends BaseAction {
  payload: string;
}

export const setLanguage = (language: LanguageType): SetLanguageAction => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const requestLanguage = (): RequestLanguageAction => ({
  type: REQUEST_LANGUAGE,
  payload: undefined,
});

export const updateAvatar = (uri: MediaType): UpdateAvatarAction => ({
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

export const requestUserProfile = (id: string): RequestUserProfileAction => ({
  type: REQUEST_USER_PROFILE,
  payload: id,
});

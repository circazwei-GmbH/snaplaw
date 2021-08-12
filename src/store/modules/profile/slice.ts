import {
  createAction,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import { LANGUAGE_ENGLISH, LANGUAGE_GERMANY } from "./constants";

export type LanguageType = "LANGUAGE_ENGLISH" | "LANGUAGE_GERMANY";

export type UserType = {
  avatar?: string;
  name?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
  address?: string;
  postCode?: string;
};

type ProfileStateInterface = {
  language: LanguageType | undefined;
  user: UserType | undefined;
  avatarLoading: boolean;
};

export const initialState: ProfileStateInterface = {
  language: undefined,
  user: undefined,
  avatarLoading: false,
};

const setLanguageAction = createAction<string, "setLanguage">("setLanguage");
const setAvatarAction = createAction<string, "setAvatar">("setAvatar");
const setUserAction = createAction<UserType, "setUser">("setUser");
const setAvatarLoadingAction = createAction<boolean, "setAvatarLoading">(
  "setAvatarLoading"
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    [setLanguageAction.type]: (
      state: Draft<ProfileStateInterface>,
      action: PayloadAction<LanguageType>
    ) => {
      if (action.payload === state.language) {
        state.language =
          action.payload === LANGUAGE_ENGLISH
            ? LANGUAGE_GERMANY
            : LANGUAGE_ENGLISH;
      } else {
        state.language = action.payload;
      }
    },
    [setAvatarAction.type]: (
      state: Draft<ProfileStateInterface>,
      action: PayloadAction<string | undefined>
    ) => {
      state.user = {
        ...state.user,
        avatar: action.payload,
      };
    },
    [setUserAction.type]: (
      state: Draft<ProfileStateInterface>,
      action: PayloadAction<UserType>
    ) => {
      state.user = action.payload;
    },
    [setAvatarLoadingAction.type]: (
      state: Draft<ProfileStateInterface>,
      action: PayloadAction<boolean>
    ) => {
      state.avatarLoading = action.payload;
    },
  },
});

export const { setLanguage, setAvatar, setUser, setAvatarLoading } =
  profileSlice.actions;

export default profileSlice.reducer;

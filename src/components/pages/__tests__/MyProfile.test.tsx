import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import MyProfile from "../MyProfile";
import * as RootNavigation from "../../../router/RootNavigation";
import store from "../../../store/index";
import { createStore } from "@reduxjs/toolkit";
import { toggleBoolValue } from "../../../utils/toggleBoolValue";
import { PROFILE_ROUTER } from "../../../router/ProfileRouterTypes";
import {clearToken} from "../../../store/modules/auth/action-creators";

jest.mock("../../../utils/toggleBoolValue.ts");

jest.mock("../../../router/RootNavigation");

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

const actions = jest.fn();

const reduser = (state: any, action: any): any => {
  actions(action);
  return state;
};

const customStore = createStore(reduser);

const titleAndButtonsText = [
  "my_profile.buttons_text.my_profile",
  "my_profile.buttons_text.language",
  "my_profile.buttons_text.notifications",
  "my_profile.buttons_text.invite_friends",
  "my_profile.buttons_text.private_policy",
  "my_profile.buttons_text.change_password",
  "my_profile.buttons_text.sign_out",
  "my_profile.buttons_text.delete_profile",
];

describe("MyProfile", () => {
  it("Should display page title and buttons text", () => {
    const { getByText } = render(
      <Provider store={store}>
        <MyProfile />
      </Provider>
    );

    titleAndButtonsText.map((item) => {
      expect(getByText(item)).toBeTruthy();
    });
  });

  it("Press on avatar should toggle avatar size", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MyProfile />
      </Provider>
    );

    fireEvent.press(getByTestId("MyProfileAvatarBox.toggle"));
    expect(toggleBoolValue).toBeCalled();
  });

  it("Buttons should call navigate event", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MyProfile />
      </Provider>
    );

    fireEvent.press(getByTestId("MyProfile.my_profile"));
    expect(RootNavigation.navigate).toBeCalledWith(PROFILE_ROUTER.EDIT_PROFILE);

    fireEvent.press(getByTestId("MyProfile.language"));
    expect(RootNavigation.navigate).toBeCalledWith(
      PROFILE_ROUTER.CHANGE_LANGUAGE
    );
  });

  it("Should dispatch clear token (logout functionality)", () => {
    const { getByText } = render(
      <Provider store={customStore}>
        <MyProfile />
      </Provider>
    );

    fireEvent.press(getByText("my_profile.buttons_text.sign_out"));
    expect(actions).toBeCalledWith(clearToken());
  });
});

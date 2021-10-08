import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import MyProfile from "../settings/MyProfile";
import * as RootNavigation from "../../../router/RootNavigation";
import store from "../../../store/index";
import { createStore } from "@reduxjs/toolkit";
import { toggleBoolValue } from "../../../utils/toggleBoolValue";
import { PROFILE_ROUTER } from "../../../router/ProfileRouterTypes";
import { clearToken } from "../../../store/modules/auth/action-creators";
import { setModal } from "../../../store/modules/main/slice";
import { BUTTON_COLORTYPE } from "../../../store/modules/main/types";

jest.mock("../../../utils/toggleBoolValue.ts");

jest.mock("../../../router/RootNavigation");
jest.mock("../../components/NotificationBell", () => {
  const React = require("react");
  return () => React.createElement("View");
});

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

const actions = jest.fn();

const initialState = {
  profile: {
    user: undefined,
  },
};

const reduser = (state: any = initialState, action: any): any => {
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

    titleAndButtonsText.forEach((item) => {
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
    expect(actions).toBeCalledWith(
      setModal({
        message: "edit_profile.modals.sign_out.message",
        actions: [
          {
            name: "edit_profile.modals.sign_out.no",
            colortype: BUTTON_COLORTYPE.ERROR,
          },
          {
            name: "edit_profile.modals.sign_out.yes",
            action: clearToken(),
          },
        ],
      })
    );
  });
});

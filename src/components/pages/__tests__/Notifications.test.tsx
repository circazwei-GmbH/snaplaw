import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Notifications from "../Notifications";
import * as RootNavigation from "../../../router/RootNavigation";
import store from "../../../store/index";
import { createStore } from "@reduxjs/toolkit";
import { PROFILE_ROUTER } from "../../../router/ProfileRouterTypes";
import { setModal } from "../../../store/modules/main/slice";
import { BUTTON_COLORTYPE } from "../../../store/modules/main/types";

jest.mock("../../../router/RootNavigation");

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

const actions = jest.fn();

const initialState = {
  notifications: [
    {
      notification: {
        id: "test",
        type: "user_invited_to_contract",
        contractId: "test",
        contractName: "testName",
        usernameFrom: "testUser",
        createdAt: `${new Date()}`,
        isNew: true,
        userId: "testId",
      },
    },
  ],
};

const reduser = (state: any = initialState, action: any): any => {
  actions(action);
  return state;
};

const customStore = createStore(reduser);

describe("Notifications", () => {
  it("Should display page title and list", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(getByText("notifications.title")).toBeTruthy();
  });
  it("Buttons should call navigate event", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent.press(getByTestId("BackButton.back"));
    expect(RootNavigation.pop).toBeCalled();
  });

  //  it("Should dispatch clear token (logout functionality)", () => {
  //    const { getByText } = render(
  //      <Provider store={customStore}>
  //        <MyProfile />
  //      </Provider>
  //    );
  //
  //    fireEvent.press(getByText("my_profile.buttons_text.sign_out"));
  //    expect(actions).toBeCalledWith(
  //      setModal({
  //        message: "edit_profile.modals.sign_out.message",
  //        actions: [
  //          {
  //            name: "edit_profile.modals.sign_out.no",
  //            colortype: BUTTON_COLORTYPE.ERROR,
  //          },
  //          {
  //            name: "edit_profile.modals.sign_out.yes",
  //            action: clearToken(),
  //          },
  //        ],
  //      })
  //    );
  //  });
});

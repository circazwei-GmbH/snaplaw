import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NotificationBell from "../NotificationBell";
import * as RootNavigation from "../../../router/RootNavigation";
import {createStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

jest.mock("../../../router/RootNavigation");

const initialState = {
  notifications: {
    notifications: [{isNew: true}]
  }
}
const actions = jest.fn();
const reduser = (state = initialState, action: any) => {
  actions(action)
  return initialState
}

const store = createStore(reduser);

describe("NotificationBell", () => {
  it("Should be pink dot", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NotificationBell />
      </Provider>
    );
    expect(getByTestId("bell.pinkDot")).toBeTruthy();
  });
  it("Should fire navigation", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NotificationBell />
      </Provider>
    );

    fireEvent.press(getByTestId("bell.button"));
    expect(RootNavigation.navigate).toBeCalled();
  });
  it("Should not display pink dot", () => {
    initialState.notifications.notifications[0].isNew = false;
    const { queryByTestId } = render(
      <Provider store={store}>
        <NotificationBell />
      </Provider>
    );
    expect(queryByTestId("bell.pinkDot")).not.toBeTruthy();
  })
});

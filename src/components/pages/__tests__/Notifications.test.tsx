import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Notifications from "../Notifications";
import * as RootNavigation from "../../../router/RootNavigation";
import store from "../../../store/index";

jest.mock("../../../router/RootNavigation");

describe("Notifications", () => {
  it("Should display page title and list", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(getByText("notifications.title")).toBeTruthy();
  });
  it("Back button should call navigate event", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent.press(getByTestId("BackButton.back"));
    expect(RootNavigation.pop).toBeCalled();
  });
  it("Empty list text should be visible", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(getByText("notifications.empty_list")).toBeTruthy();
  });
});

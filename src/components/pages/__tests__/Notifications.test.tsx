import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Notifications from "../Notifications";
import * as RootNavigation from "../../../router/RootNavigation";
import { createStore } from "redux";
import { NOTIFICATION_TYPE } from "../../../services/notification/notificationsConfig";
import {
  requestChangeNotificationStatus,
  requestNotifications,
} from "../../../store/modules/notifications/action-creators";

jest.mock("../../../router/RootNavigation");

const initialState = {
  notifications: {
    notifications: [
      {
        id: "0",
        type: NOTIFICATION_TYPE.ACCEPT_INVITE,
        contractId: "0",
        contractName: "name",
        usernameFrom: "usernameFrom",
        createdAt: "createdAt",
        isNew: false,
        userId: "0",
      },
    ],
    notificationsPagination: {
      isLoading: false,
    },
  },
};

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

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
  it("Back button should call navigate event", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent.press(getByTestId("notificationItem.openModal"));
    expect(actions).toBeCalledWith(
      requestChangeNotificationStatus({ id: "0" })
    );
  });
  it("Back button should call navigate event", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    fireEvent(getByTestId("FlatList"), "refresh");
    expect(actions).toBeCalledWith(requestNotifications(true));
  });
  it("Empty list text should be visible", () => {
    initialState.notifications.notifications = [];
    const { getByText } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(getByText("notifications.empty_list")).toBeTruthy();
  });
});

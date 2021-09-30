import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NotificationListItem from "../NotificationListItem";
import {
  NOTIFICATION_TYPE,
  notificationConfig,
} from "../../../../../services/notification/notificationsConfig";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";
import { setModal } from "../../../../../store/modules/main/slice";

jest.mock("react-native-gesture-handler/Swipeable", () => {
  const React = require("react");
  function Swipeable(props: any) {
    return React.createElement("View", { ...props, testID: "swipable" });
  }
  return Swipeable;
});

const item = {
  id: "test",
  type: NOTIFICATION_TYPE.INVITE_USER_TO_CONTRACT,
  contractId: "test",
  contractName: "testName",
  usernameFrom: "testUser",
  createdAt: `${new Date()}`,
  isNew: true,
  userId: "testId",
};

const actions = jest.fn();

const reduser = (state = {}, action: any) => {
  actions(action);
  return state;
};

const store = createStore(reduser);

describe("NotificationListItem", () => {
  it("Should be visible", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <NotificationListItem item={item} changeStatus={jest.fn} />
      </Provider>
    );
    expect(getByTestId("swipable")).toBeTruthy();
    expect(getByText(item.usernameFrom)).toBeTruthy();
  });
  it("Click on notification should fire event", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NotificationListItem item={item} changeStatus={jest.fn} />
      </Provider>
    );
    fireEvent.press(getByTestId("notificationItem.openModal"));
    const config = notificationConfig[item.type];
    expect(actions).toBeCalledWith(
      setModal({
        message: config.message,
        actions: config.actions.map((action) => ({
          name: action.name,
          colortype: action.colortype,
          action: action.actionHandler
            ? action.actionHandler(item.id)
            : undefined,
        })),
      })
    );
  });
});

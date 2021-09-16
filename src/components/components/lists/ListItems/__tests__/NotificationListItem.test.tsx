import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NotificationListItem from "../NotificationListItem";

jest.mock("react-native-gesture-handler/Swipeable", () => {
  const React = require("react");
  function Swipeable(props) {
    return React.createElement("View", { ...props, testID: "swipable" });
  }
  return Swipeable;
});

const item = {
  id: "test",
  type: "user_invited_to_contract",
  contractId: "test",
  contractName: "testName",
  usernameFrom: "testUser",
  createdAt: `${new Date()}`,
  isNew: true,
  userId: "testId",
};

describe("NotificationListItem", () => {
  it("Should be visible", () => {
    const { getByTestId, getByText } = render(
      <NotificationListItem
        item={item}
        onPress={jest.fn}
        changeStatus={jest.fn}
      />
    );
    expect(getByTestId("swipable")).toBeTruthy();
    expect(getByText(item.usernameFrom)).toBeTruthy();
  });
  it("Click on notification should fire event", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <NotificationListItem
        item={item}
        onPress={handler}
        changeStatus={jest.fn}
      />
    );
    fireEvent.press(getByTestId("notificationItem.openModal"));
    expect(handler).toBeCalled();
  });
});

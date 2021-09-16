import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NotificationListItem from "../NotificationListItem";
import dayjs from "dayjs";

jest.mock("react-native-gesture-handler/Swipeable", () => {
  const React = require("react");
  function Swipeable(props) {
    return React.createElement("View", { ...props, testID: "datePicker" });
  }
  return Swipeable;
});

const item = {
  id: "test",
  type: "test",
  contractId: "test",
  usernameFrom: "testUser",
  createdAt: new Date(),
  isNew: true,
  userId: "testId",
};

const actions = jest.fn();

describe("NotificationListItem", () => {
  it("Should be visible", () => {
    const { getByText } = render(
      <NotificationListItem
        item={item}
        onPress={actions}
        changeStatus={actions}
      />
    );
    expect(getByText(item.usernameFrom)).toBeTruthy();
  });
});

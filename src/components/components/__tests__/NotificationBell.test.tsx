import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NotificationBell from "../NotificationBell";
import * as RootNavigation from "../../../router/RootNavigation";

jest.mock("../../../router/RootNavigation");

describe("NotificationBell", () => {
  it("Should be pink dot", () => {
    const { getByTestId } = render(<NotificationBell />);
    expect(getByTestId("bell.pinkDot")).toBeTruthy();
  });
  it("Should fire navigation", () => {
    const { getByTestId } = render(<NotificationBell />);

    fireEvent.press(getByTestId("bell.button"));
    expect(RootNavigation.navigate).toBeCalled();
  });
});

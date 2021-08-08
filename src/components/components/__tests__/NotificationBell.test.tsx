import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-dom/extend-expect";
import NotificationBell from "../NotificationBell";

describe("NotificationBell", () => {
  it("NotificatiobBell pinkDot view", () => {
    const { container } = render(<NotificationBell />);
    expect(container.firstChild).toHaveStyle('backgroundColor: "#FF79CA"');
  });
});

//it("NotificatiobBell pinkDot view", () => {
//  const { getByTestId } = render(<View />);
//  expect(getByTestId("bell.pinkDot")).toBeTruthy();
//});

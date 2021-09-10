import React from "react";
import { render } from "@testing-library/react-native";
import AbstractErrorMessage from "../AbstractErrorMessage";

describe("AbstractErrorMessage", () => {
  it("Should display message", () => {
    const { getByText } = render(<AbstractErrorMessage message="test" />);
    expect(getByText("test")).toBeTruthy();
  });
});

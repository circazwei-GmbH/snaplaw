import React from "react";
import { render } from "@testing-library/react-native";
import AbstractErrorMessage from "../AbstractErrorMessage";

describe("AbstractErrorMessage", () => {
  it("Should display message", () => {
    const { getByText } = render(<AbstractErrorMessage message="test" />);
    expect(getByText("test")).toBeTruthy();
    expect(getByText("*")).toBeTruthy();
  });
  it("Should not display empty message", () => {
    const { queryByText } = render(
      <AbstractErrorMessage message={undefined} />
    );
    expect(queryByText("*")).not.toBeTruthy();
  });
});

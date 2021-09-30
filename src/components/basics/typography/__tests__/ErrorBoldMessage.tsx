import React from "react";
import { render } from "@testing-library/react-native";
import ErrorBoldMessage from "../ErrorBoldMessage";

const TEST_MSG = "test-string";

describe("ErrorBoldMessage", () => {
  it("Should display text", () => {
    const { getByText } = render(<ErrorBoldMessage text={TEST_MSG} />);
    expect(getByText(TEST_MSG)).toBeTruthy();
  });
});

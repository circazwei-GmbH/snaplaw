import React from "react";
import { render } from "@testing-library/react-native";
import DefaultText from "../DefaultText";

const TEST_TEXT = "test-text";

describe("DefaultText", () => {
  it("Should text be displayed", () => {
    const { getByText } = render(<DefaultText text={TEST_TEXT} />);

    expect(getByText(TEST_TEXT)).toBeTruthy();
  });
});

import React from "react";
import { render } from "@testing-library/react-native";
import TextFieldImitation from "../TextFieldImitation";

const testText = "TEXT";

describe("TextFieldImitation", () => {
  it("Text should be visible", () => {
    const { getByText, getByTestId } = render(
      <TextFieldImitation value={testText} placeholder="TestField" />
    );
    expect(getByText(testText)).toBeTruthy();
    expect(getByTestId("TestField").props.style[1]).toBeNull();
  });
  it("Should change styles and show text", () => {
    const { getByText, getByTestId } = render(
      <TextFieldImitation gray settings value={testText} placeholder="TestField" />
    );
    expect(getByTestId("TestField").props.style[1]).not.toBeNull();
    expect(getByText(testText).props.style[2]).not.toBeNull();
  });
  it("Should change styles with error", () => {
    const { getByTestId } = render(
      <TextFieldImitation errorMessage="errorMessage" placeholder="TestField" />
    );
    expect(getByTestId("TextFieldImitationView").props.style[2]).not.toBeNull();
  });
  it("Should show plaseholder without styles", () => {
    const { getByTestId } = render(
      <TextFieldImitation settings placeholder="TestField" />
    );
    expect(getByTestId("Placeholder.TestField").props.style[2]).toBeNull();
  });
});

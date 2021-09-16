import React from "react";
import { render } from "@testing-library/react-native";
import TextFieldImitation from "../TextFieldImitation";

const testText = "TEXT";

describe("TextFieldImitation", () => {
  it("Text should be visible", () => {
    const { getByText } = render(
      <TextFieldImitation value={testText} placeholder="TestField" />
    );
    expect(getByText(testText)).toBeTruthy();
  });
});

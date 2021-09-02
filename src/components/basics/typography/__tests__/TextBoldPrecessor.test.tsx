import React from "react";
import { render } from "@testing-library/react-native";
import TextBoldPrecessor from "../TextBoldPrecessor";

describe("TextBoldPrecessor", () => {
  it("Should diaplay text", () => {
    const { getByText } = render(<TextBoldPrecessor message="Test text" />);
    expect(getByText("Test text")).toBeTruthy();
  });
  it("Should add bold", () => {
    const { getByText } = render(
      <TextBoldPrecessor message="Test ^bold^ text" />
    );
    expect(getByText("Test ")).toBeTruthy();
    expect(getByText("bold")).toBeTruthy();
    expect(getByText(" text")).toBeTruthy();
    expect(getByText("bold").props.style[1]).toEqual({ fontFamily: "OS-B" });
  });
});

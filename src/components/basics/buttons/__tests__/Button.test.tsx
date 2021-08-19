import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "../Button";

describe("Button", () => {
  it("Button view", () => {
    const handler = jest.fn();
    const { getByText } = render(<Button text={"Test"} onPress={handler} />);
    expect(getByText("Test")).toBeTruthy();
  });
  it("Button test click", async () => {
    const handler = jest.fn();
    const { getByText } = render(<Button text={"Test"} onPress={handler} />);
    fireEvent(getByText("Test"), "press");
    expect(handler).toBeCalled();
  });
});

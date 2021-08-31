import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TextButton from "../TextButton";

describe("TextButton", () => {
  it("TextButton view", () => {
    const handler = jest.fn();
    const { getByText } = render(
      <TextButton text={"Test"} onPress={handler} type="right" />
    );
    expect(getByText("Test")).toBeTruthy();
  });
  it("TextButton click test", () => {
    const handler = jest.fn();
    const { getByText } = render(
      <TextButton text={"Test"} onPress={handler} type="right" />
    );

    fireEvent.press(getByText("Test"));
    expect(handler).toBeCalled();
  });
  it("TextButton on disabled test", () => {
    const handler = jest.fn();
    const { getByText } = render(
      <TextButton text={"Test"} onPress={handler} type="right" disabled />
    );
    fireEvent.press(getByText("Test"));
    expect(handler).not.toBeCalled();
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import IconButton from "../IconButton";

describe("IconButton", () => {
  it("IconButton view", () => {
    const handler = jest.fn();
    const { getByText } = render(
      <IconButton text={"Test"} onPress={handler} />
    );
    expect(getByText("Test")).toBeTruthy();
  });
  it("Button test click", async () => {
    const handler = jest.fn();
    const { getByText } = render(
      <IconButton text={"Test"} onPress={handler} />
    );
    fireEvent(getByText("Test"), "press");
    expect(handler).toBeCalled();
  });
});

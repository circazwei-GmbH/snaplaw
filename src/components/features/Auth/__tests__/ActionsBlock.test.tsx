import React from "react";
import ActionBlock from "../ActionsBlock";
import { render, fireEvent } from "@testing-library/react-native";

describe("ActionsBlock", () => {
  it("Should elements viewed", () => {
    const { getByText } = render(
      <ActionBlock
        submitHandler={jest.fn}
        buttonTextKey="test.button.key"
        underButtonTextKey="test.under.button.key"
      />
    );
    expect(getByText("test.button.key")).toBeTruthy();
    expect(getByText("test.under.button.key")).toBeTruthy();
  });
  it("Should called on press", () => {
    const handler = jest.fn();
    const { getByText } = render(
      <ActionBlock
        submitHandler={handler}
        buttonTextKey="test.button.key"
        underButtonTextKey="test.under.button.key"
      />
    );
    fireEvent.press(getByText("test.button.key"));
    expect(handler).toBeCalled();
  });
});

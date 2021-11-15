import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "../Button";
import { BUTTON_COLORTYPE } from "../../../../store/modules/main/types";

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
  it("onPresssIn", () => {
    const { getByText } = render(<Button text={"test"} onPress={jest.fn()} />);
    fireEvent(getByText("test"), "onPressIn");
    expect(getByText("test").parent.props.style[3]).not.toBeNull();
  });
  it("onPresssOut", () => {
    const { getByText } = render(<Button textColorType={BUTTON_COLORTYPE.ERROR} text={"test"} onPress={jest.fn()} />);
    fireEvent(getByText("test"), "onPressIn");
    fireEvent(getByText("test"), "onPressOut");
    expect(getByText("test").parent.props.style[3]).toBeNull();
  });
});

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import PasswordField from "../PasswordField";

const testText = "TEXT";

describe("PasswordField", () => {
  it("Should view", () => {
    const { getByPlaceholderText } = render(
      <PasswordField value="test" placeholder="TestField" onChange={jest.fn} />
    );
    expect(getByPlaceholderText("TestField")).toBeTruthy();
  });
  it("Should call prop-function onPress", () => {
    const handler = jest.fn();
    const { getByPlaceholderText } = render(
      <PasswordField value="test" placeholder="TestField" onChange={handler} />
    );
    fireEvent.changeText(getByPlaceholderText("TestField"), testText);
    expect(handler).toBeCalled();
    expect(handler).toBeCalledWith(testText);
  });
  it("Should change secureTextEntry", () => {
    const handler = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <PasswordField value="test" placeholder="TestField" onChange={handler} />
    );
    expect(
      getByPlaceholderText("TestField").props.secureTextEntry
    ).toBeTruthy();
    fireEvent.press(getByTestId("PasswordField.Icon"));
    expect(getByPlaceholderText("TestField").props.secureTextEntry).toBeFalsy();
  });
  it("Should change secureTextEntry", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <PasswordField value="test" placeholder="TestField" onChange={handler} />
    );
    fireEvent(getByTestId("TestField"), "focus");

    expect(getByTestId("TestField").props.style[1]).not.toBeNull();
    expect(getByTestId("TestField").props.style[2]).toBeNull();

    fireEvent(getByTestId("TestField"), "blur");

    expect(getByTestId("TestField").props.style[1]).toBeNull();
    expect(getByTestId("TestField").props.style[2]).not.toBeNull();
  });
});

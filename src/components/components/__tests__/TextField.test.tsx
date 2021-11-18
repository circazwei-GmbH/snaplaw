import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import TextField from "../TextField";

const testText = "TEXT";

describe("TextField", () => {
  it("Should view", () => {
    const { getByPlaceholderText } = render(
      <TextField
        value="test"
        placeholder="TestField"
        onChangeFunction={jest.fn}
      />
    );
    expect(getByPlaceholderText("TestField").props.style[4]).toBeNull();
    expect(getByPlaceholderText("TestField")).toBeTruthy();
  });
  it("Should call prop-function onPress", () => {
    const handler = jest.fn();
    const { getByPlaceholderText } = render(
      <TextField
        value="test"
        placeholder="TestField"
        onChangeFunction={handler}
      />
    );
    fireEvent.changeText(getByPlaceholderText("TestField"), testText);
    fireEvent(getByPlaceholderText("TestField"), "focus");
    expect(handler).toBeCalled();
    expect(handler).toBeCalledWith(testText);
  });
  it("Should call onBlur function", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <TextField
        value="test"
        placeholder="TestField"
        onChangeFunction={handler}
        editable
        testID="TestField"
      />
    );
    fireEvent(getByTestId("TestField"), "focus");
    expect(getByTestId("TestField").props.style[1]).not.toBeNull()
    fireEvent(getByTestId("TestField"), "blur");
    expect(getByTestId("TestField").props.style[1]).toBeNull();
    expect(getByTestId("TestField").props.style[4]).not.toBeNull();
  });
});

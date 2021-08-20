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
    expect(handler).toBeCalled();
    expect(handler).toBeCalledWith(testText);
  });
});

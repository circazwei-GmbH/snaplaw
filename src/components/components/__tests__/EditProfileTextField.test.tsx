import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import EditProfileTextField from "../EditProfileTextField";

const testText = "TEXT";

describe("TextField", () => {
  it("Should view", () => {
    const { getByPlaceholderText } = render(
      <EditProfileTextField
        value="test"
        placeholder="TestField"
        onChangeFunction={jest.fn}
        edit={true}
      />
    );
    expect(getByPlaceholderText("TestField")).toBeTruthy();
  });

  it("Should call prop-function onPress", () => {
    const handler = jest.fn();
    const { getByPlaceholderText } = render(
      <EditProfileTextField
        value="test"
        placeholder="TestField"
        onChangeFunction={handler}
        edit={true}
      />
    );
    fireEvent.changeText(getByPlaceholderText("TestField"), testText);
    expect(handler).toBeCalled();
    expect(handler).toBeCalledWith(testText);
  });

  it("Should not call prop-function onPress when editable false", () => {
    const handler = jest.fn();
    const { getByPlaceholderText } = render(
      <EditProfileTextField
        value="test"
        placeholder="TestField"
        onChangeFunction={handler}
        editable={false}
        edit={false}
      />
    );
    fireEvent.changeText(getByPlaceholderText("TestField"), testText);
    expect(handler).not.toBeCalled();
    expect(handler).not.toBeCalledWith(testText);
  });
});

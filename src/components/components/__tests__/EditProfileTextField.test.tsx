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
  it("Should focus effect", () => {
    const { getByTestId } = render(
      <EditProfileTextField
        value="test"
        placeholder="TestField"
        onChangeFunction={jest.fn()}
        editable={false}
        edit={false}
      />
    );
    fireEvent(getByTestId("Input"), "onFocus");
    expect(getByTestId("Input").props.style[1]).not.toBeNull();
    expect(getByTestId("Input").props.style[2]).toBeNull();
    fireEvent(getByTestId("Input"), "onBlur");
    expect(getByTestId("Input").props.style[1]).toBeNull();
    expect(getByTestId("Input").props.style[2]).not.toBeNull();
  });
  it("With empty value", () => {
    const { getByPlaceholderText } = render(
      <EditProfileTextField
        value=""
        placeholder="TestField"
        onChangeFunction={jest.fn()}
        editable={false}
        edit={false}
      />
    );
    expect(getByPlaceholderText("TestField")).toBeTruthy();
  });
  it("Should display error message", () => {
    const { getByText } = render(
      <EditProfileTextField
        value=""
        errorMessage="Empty"
        placeholder="TestField"
        onChangeFunction={jest.fn()}
        editable={false}
        edit={false}
      />
    );
    expect(getByText("Empty")).toBeTruthy();
  });
});

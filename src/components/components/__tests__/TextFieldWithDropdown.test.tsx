import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import TextFieldWithDropdown from "../TextFieldWithDropdown";

const testText = "TEXT";
const testList: string[] = ["testMail"];

describe("InviteTextField", () => {
  it("Should be visible", () => {
    const { getByPlaceholderText } = render(
      <TextFieldWithDropdown
        value="test"
        placeholder="TestPlaceholder"
        onChangeFunction={jest.fn}
        list={testList}
        getList={jest.fn}
        setValue={jest.fn}
      />
    );
    expect(getByPlaceholderText("TestPlaceholder")).toBeTruthy();
  });
  it("Should call prop-function onPress", () => {
    const handler = jest.fn();
    const { getByPlaceholderText } = render(
      <TextFieldWithDropdown
        value="test"
        placeholder="TestPlaceholder"
        onChangeFunction={handler}
        list={testList}
        getList={jest.fn}
        setValue={jest.fn}
      />
    );
    fireEvent.changeText(getByPlaceholderText("TestPlaceholder"), testText);
    expect(handler).toBeCalled();
    expect(handler).toBeCalledWith(testText);
  });
});

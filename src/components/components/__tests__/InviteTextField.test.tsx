import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import InviteTextField from "../InviteTextField";

const testText = "TEXT";
const testList: object[] = [
  {
    email: "testMail",
    id: 123,
  },
];

describe("InviteTextField", () => {
  it("Should be visible", () => {
    const { getByPlaceholderText } = render(
      <InviteTextField
        value="test"
        placeholder="TestPlaceholder"
        onChangeFunction={jest.fn}
        list={testList}
        getEmails={jest.fn}
      />
    );
    expect(getByPlaceholderText("TestPlaceholder")).toBeTruthy();
  });
  it("Should call prop-function onPress", () => {
    const handler = jest.fn();
    const { getByPlaceholderText } = render(
      <InviteTextField
        value="test"
        placeholder="TestPlaceholder"
        onChangeFunction={handler}
        list={testList}
        getEmails={jest.fn}
      />
    );
    fireEvent.changeText(getByPlaceholderText("TestPlaceholder"), testText);
    expect(handler).toBeCalled();
    expect(handler).toBeCalledWith(testText);
  });
});

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import TextFieldWithDropdown from "../TextFieldWithDropdown";
import { EmailsListItemInterface } from "../../../store/modules/contract/types";

const testText = "TEXT";
const testList: EmailsListItemInterface[] = [{ _id: "testMail" }];

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
  it("Should display list", () => {
    const { getByTestId, getByText } = render(
      <TextFieldWithDropdown
        value="test"
        placeholder="TestPlaceholder"
        onChangeFunction={jest.fn}
        list={testList}
        getList={jest.fn}
        setValue={jest.fn}
      />
    );
    fireEvent(getByTestId("TestPlaceholder"), "focus");
    expect(getByText(testList[0]._id)).toBeTruthy();
  });
  it("Should call setValue prop-function", () => {
    const handler = jest.fn();
    const { getByTestId, getByText } = render(
      <TextFieldWithDropdown
        value="test"
        placeholder="TestPlaceholder"
        onChangeFunction={jest.fn}
        list={testList}
        getList={jest.fn}
        setValue={handler}
      />
    );
    fireEvent(getByTestId("TestPlaceholder"), "focus");
    fireEvent.press(getByText(testList[0]._id));
    expect(handler).toBeCalledWith(testList[0]._id);
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
  it("Should call inputButtonHandler function", () => {
    const { getByTestId } = render(
      <TextFieldWithDropdown
        value="test"
        placeholder="TestPlaceholder"
        onChangeFunction={jest.fn}
        list={testList}
        getList={jest.fn}
        setValue={jest.fn}
      />
    );
    expect(getByTestId("TestPlaceholder").props.style[1]).toBeNull();
    fireEvent.press(getByTestId("TouchableOpacity"));
    expect(getByTestId("TestPlaceholder").props.style[1]).not.toBeNull();
    fireEvent.press(getByTestId("TouchableOpacity"));
  });
  it("Should call getList prop-function and change styles on focus and blur", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <TextFieldWithDropdown
        value="test"
        placeholder="TestPlaceholder"
        onChangeFunction={jest.fn}
        list={[]}
        getList={handler}
        setValue={jest.fn}
      />
    );
    expect(
      getByTestId("TouchableOpacity").props.children[0].props.name
    ).toEqual("arrow-down");

    fireEvent(getByTestId("TestPlaceholder"), "focus");

    expect(
      getByTestId("TouchableOpacity").props.children[0].props.name
    ).toEqual("arrow-up");
    expect(getByTestId("TestPlaceholder").props.style[1]).not.toBeNull();
    expect(handler).toBeCalled();

    fireEvent(getByTestId("TestPlaceholder"), "blur");

    expect(getByTestId("TestPlaceholder").props.style[1]).toBeNull();
  });
  it("Should display error message", () => {
    const { getByTestId, getByText } = render(
      <TextFieldWithDropdown
        value="test"
        placeholder="TestPlaceholder"
        onChangeFunction={jest.fn}
        list={testList}
        getList={jest.fn}
        setValue={jest.fn}
        errorMessage="errorMessage"
      />
    );
    fireEvent(getByTestId("TestPlaceholder"), "focus");
    expect(getByTestId("FlatList").props.style[1].top).toEqual(75);
    expect(getByText("errorMessage"));
  });
});

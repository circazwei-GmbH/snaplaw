import React from "react";
import { Text, View } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import TopBar from "../TopBar";
import BackButton from "../../basics/buttons/BackButton";
import * as RootNavigation from "../../../router/RootNavigation";

jest.mock("../../../router/RootNavigation");

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

const Child = () => (
  <View>
    <Text>SomeTestChild</Text>
  </View>
);

const BottomElement = () => (
  <View>
    <Text>BottomElement</Text>
  </View>
);

describe("HeaderNavigation", () => {
  it("Should display name and children", () => {
    const { getByText } = render(
      <TopBar pageName="TestName">
        <Child />
      </TopBar>
    );

    expect(getByText("SomeTestChild")).toBeTruthy();
    expect(getByText("TestName")).toBeTruthy();
  });
  it("Default button should navigate back", () => {
    const { getByTestId } = render(
      <TopBar pageName="TestName">
        <Child />
      </TopBar>
    );

    fireEvent.press(getByTestId("BackButton.back"));
    expect(RootNavigation.pop).toBeCalled();
  });
  it("Right button should navigate back", () => {
    const { getByTestId } = render(
      <TopBar
        pageName="TestName"
        leftButton={<Child />}
        rightButton={<BackButton />}
      >
        <Child />
      </TopBar>
    );

    fireEvent.press(getByTestId("BackButton.back"));
    expect(RootNavigation.pop).toBeCalled();
  });
  it("Should display BottomElement and WithBackground", () => {
    const { getByText, getByTestId } = render(
      <TopBar pageName="TestName" withBackground bottomElement={<BottomElement/>}>
        <Child />
      </TopBar>
    );

    expect(getByTestId("WithBackground")).toBeTruthy();
    expect(getByText("BottomElement")).toBeTruthy();
  });
  it("Should display BottomElement", () => {
    const { getByText, queryByTestId } = render(
      <TopBar pageName="TestName" bottomElement={<BottomElement/>}>
        <Child />
      </TopBar>
    );

    expect(queryByTestId("WithBackground")).toBeFalsy();
    expect(getByText("BottomElement")).toBeTruthy();
  });
});

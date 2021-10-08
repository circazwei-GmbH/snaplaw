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

describe("HeaderNavigation", () => {
  it("Should display name and children", () => {
    const Child = () => (
      <View>
        <Text>SomeTestChild</Text>
      </View>
    );

    const { getByText } = render(
      <TopBar pageName="TestName">
        <Child />
      </TopBar>
    );

    expect(getByText("SomeTestChild")).toBeTruthy();
    expect(getByText("TestName")).toBeTruthy();
  });

  it("Default button should navigate back", () => {
    const Child = () => (
      <View>
        <Text>SomeTestChild</Text>
      </View>
    );

    const { getByTestId } = render(
      <TopBar pageName="TestName">
        <Child />
      </TopBar>
    );

    fireEvent.press(getByTestId("BackButton.back"));
    expect(RootNavigation.pop).toBeCalled();
  });

  it("Right button should navigate back", () => {
    const Child = () => (
      <View>
        <Text>SomeTestChild</Text>
      </View>
    );

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
});

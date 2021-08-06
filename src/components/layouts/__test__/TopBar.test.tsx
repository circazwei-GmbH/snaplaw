import React from "react";
import { Text, View } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import TopBar from "../TopBar";
import BackButton from "../../basics/buttons/BackButton";
import NotificationBell from "../../components/NotificationBell";
import * as RootNavigation from "../../../router/RootNavigation";

jest.mock("../../../router/RootNavigation");

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
        leftButton={<NotificationBell />}
        rightButton={<BackButton />}
      >
        <Child />
      </TopBar>
    );

    RootNavigation.pop.mockClear();
    fireEvent.press(getByTestId("BackButton.back"));
    expect(RootNavigation.pop).toBeCalled();
  });
});

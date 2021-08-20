import React from "react";
import { render } from "@testing-library/react-native";
import AuthLayout from "../AuthLayout";
import { Text, View } from "react-native";

describe("AuthLayout", () => {
  it("Should display children", () => {
    const Child = () => (
      <View>
        <Text>ChildComponent</Text>
      </View>
    );
    const { getByText } = render(
      <AuthLayout>
        <Child />
      </AuthLayout>
    );

    expect(getByText("ChildComponent")).toBeTruthy();
  });
});

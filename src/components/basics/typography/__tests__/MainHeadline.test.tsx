import React from "react";
import { render } from "@testing-library/react-native";
import MainHeadline from "../MainHeadline";

describe("MainHeadline", () => {
  it("MainHeadline view", () => {
    const { getByText } = render(<MainHeadline text="TestText" />);
    expect(getByText("TestText")).toBeTruthy();
  });
});

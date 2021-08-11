import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfileButton from "../ProfileButton";

describe("ProfileButton", () => {
  it("ProfileButton view", () => {
    const handler = jest.fn();
    const { getByText } = render(
      <ProfileButton text={"Test"} onPress={handler} />
    );
    expect(getByText("Test")).toBeTruthy();
  });
  it("ProfileButton test click", async () => {
    const handler = jest.fn();
    const { getByText } = render(
      <ProfileButton text={"Test"} onPress={handler} />
    );
    fireEvent(getByText("Test"), "press");
    expect(handler).toBeCalled();
  });
});

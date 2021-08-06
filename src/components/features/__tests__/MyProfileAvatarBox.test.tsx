import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import MyProfileAvatarBox from "../MyProfileAvatarBox";
import { toggleBoolValue } from "../../../utils/toggleBoolValue";

jest.mock("../../../utils/toggleBoolValue.ts");

describe("MyProfileAvatarBox", () => {
  it("Should toggle avatar size", () => {
    const { getByTestId } = render(<MyProfileAvatarBox />);

    fireEvent.press(getByTestId("MyProfileAvatarBox.toggle"));
    expect(toggleBoolValue).toBeCalled();
  });
});

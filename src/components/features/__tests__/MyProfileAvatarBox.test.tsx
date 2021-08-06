import React from "react";
import { Text, View } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import MyProfileAvatarBox from "../MyProfileAvatarBox";
import { toggleAvatarSize } from "../../../utils/toggleAvatarSize";

jest.mock("../../../utils/toggleAvatarSize.ts");

describe("MyProfileAvatarBox", () => {
  it("Should toggle avatar size", () => {
    const { getByTestId } = render(<MyProfileAvatarBox />);

    fireEvent.press(getByTestId("MyProfileAvatarBox.toggle"));
    expect(toggleAvatarSize).toBeCalled();
  });
});

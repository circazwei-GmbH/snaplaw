import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import MyProfileAvatarBox from "../MyProfileAvatarBox";
import { toggleBoolValue } from "../../../utils/toggleBoolValue";
import { Provider } from "react-redux";
import store from "../../../store";

jest.mock("../../../utils/toggleBoolValue.ts");

describe("MyProfileAvatarBox", () => {
  it("Should toggle avatar size", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MyProfileAvatarBox />
      </Provider>
    );

    fireEvent.press(getByTestId("MyProfileAvatarBox.toggle"));
    expect(toggleBoolValue).toBeCalled();
  });
});

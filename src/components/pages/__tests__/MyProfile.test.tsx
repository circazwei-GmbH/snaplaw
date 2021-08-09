import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import store from "../../../store/index";
import MyProfile from "../MyProfile";

describe("MyProfile", () => {
  it("Should display buttons", () => {
    const { getByText } = render(
      <Provider store={store}>
        <MyProfile />
      </Provider>
    );

    expect(getByText("my_profile.buttons_text.my_profile")).toBeTruthy();
    expect(getByText("my_profile.buttons_text.language")).toBeTruthy();
    expect(getByText("my_profile.buttons_text.notifications")).toBeTruthy();
    expect(getByText("my_profile.buttons_text.invite_friends")).toBeTruthy();
    expect(getByText("my_profile.buttons_text.private_policy")).toBeTruthy();
    expect(getByText("my_profile.buttons_text.change_password")).toBeTruthy();
    expect(getByText("my_profile.buttons_text.sign_out")).toBeTruthy();
    expect(getByText("my_profile.buttons_text.delete_profile")).toBeTruthy();
  });
});

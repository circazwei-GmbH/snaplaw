import React from "react";
import { render } from "@testing-library/react-native";
import VerificationCounter from "../VerificationCounter";
import { Provider } from "react-redux";
import store from "../../../store/index";

describe("VerificationCounter", () => {
  it("Should display text", () => {
    const { getByText } = render(
      <Provider store={store}>
        <VerificationCounter sizeSmall />
      </Provider>
    );
    expect(getByText("my_profile.verified_gray")).toBeTruthy();
    expect(getByText("0 my_profile.verified_black")).toBeTruthy();
  });
});

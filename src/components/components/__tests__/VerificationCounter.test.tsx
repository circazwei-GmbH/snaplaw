import React from "react";
import { render } from "@testing-library/react-native";
import VerificationCounter from "../VerificationCounter";
import { Provider } from "react-redux";
import { LANGUAGE_ENGLISH, LANGUAGE_GERMANY } from "../../../store/modules/profile/constants";
import { createStore } from "redux";

const initialState = {
  profile: {
    language: LANGUAGE_ENGLISH,
  },
};

const reduser = (state = initialState) => {
  return initialState;
};

const store = createStore(reduser);

describe("VerificationCounter", () => {
  it("Should display text", () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <VerificationCounter sizeSmall />
      </Provider>
    );
    expect(getByText("my_profile.verified_gray")).toBeTruthy();
    expect(getByText("0 my_profile.verified_black")).toBeTruthy();
    expect(getByTestId("VerificationCounter").props.style.flexDirection).toEqual("column");
    expect(getByText("my_profile.verified_gray").props.style[1].width).toEqual("65%");
  });
  it("Should display in row", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <VerificationCounter doHaveUrl={{ uri: "uri" }} />
      </Provider>
    );
    expect(getByTestId("VerificationCounter").props.style.flexDirection).toEqual("row");
  });
  it("Should display text", () => {
    initialState.profile.language = LANGUAGE_GERMANY;
    const { getByText } = render(
      <Provider store={store}>
        <VerificationCounter sizeSmall />
      </Provider>
    );
    expect(getByText("my_profile.verified_gray").props.style[1].width).toEqual("40%");
  });
});

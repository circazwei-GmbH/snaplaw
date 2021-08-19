import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import ChangeLanguage from "../settings/ChangeLanguage";
import store from "../../../store/index";
import { createStore } from "@reduxjs/toolkit";
import { setLanguage } from "../../../store/modules/profile/action-creators";
import {
  LANGUAGE_ENGLISH,
  LANGUAGE_GERMANY,
} from "../../../store/modules/profile/constants";

const actionType = jest.fn();

const initialState = {
  profile: {
    language: undefined,
  },
};

const resucer = (state = initialState, action: any) => {
  actionType(action);
  return state;
};

const customStore = createStore(resucer);

describe("ChangeLanguage", () => {
  it("Should display switches", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ChangeLanguage />
      </Provider>
    );

    expect(getByText("change_language.title")).toBeTruthy();
    expect(getByText("change_language.languages.english")).toBeTruthy();
    expect(getByText("change_language.languages.germany")).toBeTruthy();
  });
  it("Should dispatch on press", () => {
    const { getByTestId } = render(
      <Provider store={customStore}>
        <ChangeLanguage />
      </Provider>
    );

    fireEvent(
      getByTestId("Switch.change_language.languages.germany"),
      "onValueChange",
      1
    );

    expect(actionType).toBeCalledWith(setLanguage(LANGUAGE_GERMANY));

    fireEvent(
      getByTestId("Switch.change_language.languages.english"),
      "onValueChange",
      1
    );
    expect(actionType).toBeCalledWith(setLanguage(LANGUAGE_ENGLISH));
  });
});

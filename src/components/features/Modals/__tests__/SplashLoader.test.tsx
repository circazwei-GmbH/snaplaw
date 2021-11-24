import { render } from "@testing-library/react-native";
import { OrientationLock } from "expo-screen-orientation";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import SplashLoader from "../SplashLoader";

const initialState = {
  main: {
    waiter: {
      message: "message",
      events: [],
    },
    orientation: OrientationLock.PORTRAIT_UP,
  },
};

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("SplashLoader", () => {
  it("Should display message", () => {
    const { getByText } = render(
      <Provider store={store}>
        <SplashLoader />
      </Provider>
    );
    expect(getByText(initialState.main.waiter.message));
  });
});

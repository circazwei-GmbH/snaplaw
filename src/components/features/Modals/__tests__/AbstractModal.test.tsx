import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import AbstractModal from "../AbstractModal";
import { Provider } from "react-redux";

const initialState = {
  main: {
    modal: {
      message: "Test message",
      actions: [
        {
          name: "Ok",
          colortype: "primary",
          action: {
            type: "some",
          },
        },
        {
          name: "Ok-test",
          colortype: "primary",
        },
      ],
    },
  },
};
const actions = jest.fn();
const reduser = (state = initialState, action: any) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("AbstractModal", () => {
  it("Should displayed", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <AbstractModal />
      </Provider>
    );
    expect(getByTestId("modal")).toBeTruthy();
    expect(getByTestId("modal").props.visible).toBeTruthy();
    expect(getByText(initialState.main.modal.message)).toBeTruthy();
    initialState.main.modal.actions.forEach((button) => {
      expect(getByText(button.name)).toBeTruthy();
    });
  });
  it("Should call handler on click", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AbstractModal />
      </Provider>
    );
    fireEvent.press(getByText(initialState.main.modal.actions[0].name));
    expect(actions).toBeCalledWith(initialState.main.modal.actions[0].action);
  });
});

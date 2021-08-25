import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Confirmation from "../Confirmation";
import { CONFIRMATION } from "../../../../../store/modules/contract/types";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../../store/modules/contract/slice";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.PURCHASE,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.CONFIRMATION,
          data: {},
        },
      ],
    },
  },
};

const actions = jest.fn();
const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("Confirmation", () => {
  it("Should display all checkboxes", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Confirmation />
      </Provider>
    );

    CONFIRMATION.forEach((confirmation) => {
      expect(
        getByText(
          `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.confirmation.${confirmation}`
        )
      ).toBeTruthy();
    });
  });
  it("Should dispatch action on check", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Confirmation />
      </Provider>
    );
    CONFIRMATION.forEach((confirmation) => {
      fireEvent.press(
        getByText(
          `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.confirmation.${confirmation}`
        )
      );
      expect(actions).toBeCalledWith(
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.CONFIRMATION,
          fieldName: confirmation,
          value: true,
        })
      );
    });
  });
});

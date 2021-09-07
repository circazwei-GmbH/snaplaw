import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Confirmation from "../Confirmation";
import {
  CONFIRMATION,
  CONFIRMATION_FIELDS,
} from "../../../../../store/modules/contract/types";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";

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
  it("Should dispatch validator", () => {
    // @ts-ignore
    initialState.contract = {
      ...initialState.contract,
      contractErrors: {
        [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
          [CONFIRMATION_FIELDS.FIRST]: "some error",
        },
      },
    };
    const { getByText } = render(
      <Provider store={store}>
        <Confirmation />
      </Provider>
    );
    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.confirmation.${CONFIRMATION_FIELDS.FIRST}`
      )
    );
    expect(actions).toBeCalledWith(
      validateScreen(
        CONTRACT_TYPES.PURCHASE,
        CONTRACT_SCREEN_TYPES.CONFIRMATION
      )
    );
  });
  it("Should not render screen with undefined contract type", () => {
    // @ts-ignore
    initialState.contract.currentContract = undefined;
    const { queryByText } = render(
      <Provider store={store}>
        <Confirmation />
      </Provider>
    );
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.confirmation.${CONFIRMATION_FIELDS.FIRST}`
      )
    ).not.toBeTruthy();
  });
});

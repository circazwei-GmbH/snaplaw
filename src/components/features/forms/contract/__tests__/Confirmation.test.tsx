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
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.PURCHASE,
      meRole: CONTRACT_ROLE.OWNER,
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

    Object.keys(CONFIRMATION[CONTRACT_TYPES.PURCHASE]).forEach(
      (confirmation) => {
        // @ts-ignore
        if (
          !CONFIRMATION[CONTRACT_TYPES.PURCHASE][confirmation].includes(
            CONTRACT_ROLE.OWNER
          )
        ) {
          return;
        }
        expect(
          getByText(
            `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.confirmation.${CONTRACT_ROLE.OWNER}.${confirmation}`
          )
        ).toBeTruthy();
      }
    );
  });
  it("Should dispatch action on check", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Confirmation />
      </Provider>
    );
    Object.keys(CONFIRMATION[CONTRACT_TYPES.PURCHASE]).forEach(
      (confirmation) => {
        // @ts-ignore
        if (
          !CONFIRMATION[CONTRACT_TYPES.PURCHASE][confirmation].includes(
            CONTRACT_ROLE.OWNER
          )
        ) {
          return;
        }
        fireEvent.press(
          getByText(
            `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.confirmation.${CONTRACT_ROLE.OWNER}.${confirmation}`
          )
        );
        expect(actions).toBeCalledWith(
          setScreenData({
            screenType: CONTRACT_SCREEN_TYPES.CONFIRMATION,
            fieldName: confirmation,
            value: true,
          })
        );
      }
    );
  });
  it("Should dispatch validator", () => {
    initialState.contract = {
      ...initialState.contract,
      // @ts-ignore
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
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.confirmation.${CONTRACT_ROLE.OWNER}.${CONFIRMATION_FIELDS.FIRST}`
      )
    );
    expect(actions).toBeCalledWith(
      validateScreen(
        CONTRACT_TYPES.PURCHASE,
        CONTRACT_SCREEN_TYPES.CONFIRMATION
      )
    );
  });
  it("Should show additionsl text", () => {
    // @ts-ignore
    initialState.contract.currentContract.meRole = CONTRACT_ROLE.PARTNER;
    initialState.contract.currentContract.screens.push({
      type: CONTRACT_SCREEN_TYPES.PAYMENT,
      data: {},
    });
    const { getByText } = render(
      <Provider store={store}>
        <Confirmation />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.partner_text`
      )
    ).toBeTruthy();
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
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.confirmation.${CONTRACT_ROLE.OWNER}.${CONFIRMATION_FIELDS.FIRST}`
      )
    ).not.toBeTruthy();
  });
});

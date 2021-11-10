import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import PaymentLayout from "../PaymentLayout";
import { Text } from "react-native";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../store/modules/contract/constants";
import { CONTRACT_ROLE } from "../../../store/modules/contract/contract-roles";
import { CURRENCY, PAYMENT_FIELDS, PAYMENT_METHODS } from "../../../store/modules/contract/payment";

const INITIAL_STATE = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.PURCHASE,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.PAYMENT,
          data: {
            [PAYMENT_FIELDS.CURRENCY]: CURRENCY.EUR,
            [PAYMENT_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS.CASH,
            [PAYMENT_FIELDS.SELLER_PAYMENT_METHOD]: PAYMENT_METHODS.TRANSFER,
          },
        },
      ],
    },
  },
};

const actions = jest.fn();
const initStore = (initialState: Record<string, unknown>) => {
  const reduser = (state = initialState, action: unknown) => {
    actions(action);
    return initialState;
  };
  return createStore(reduser);
};

describe("PaymentLayout", () => {
  it("Should render error message", () => {
    const initialState = INITIAL_STATE;
    // @ts-ignore
    initialState.contract.currentContract.meRole = CONTRACT_ROLE.PARTNER;
    const store = initStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <PaymentLayout updateDataHandler={() => {}} />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.partner_text`
      )
    ).toBeTruthy();
  });
  it("Should not render on undefined contract type", () => {
    const initialState = INITIAL_STATE;
    // @ts-ignore
    initialState.contract.currentContract = undefined;
    const store = initStore(initialState);
    const { queryByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentLayout updateDataHandler={() => {}} />
      </Provider>
    );
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.product_price`
      )
    ).not.toBeTruthy();
  });
});

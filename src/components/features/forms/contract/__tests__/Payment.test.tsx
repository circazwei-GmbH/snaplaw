import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Payment from "../Payment";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import {
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
} from "../../../../../store/modules/contract/types";
import { CURRENSY } from "../../../../../store/modules/contract/purchase/payment";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";

const INITIAL_STATE = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.PURCHASE,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.PAYMENT,
          data: {
            [PAYMENT_FIELDS.CURRENCY]: CURRENSY.EUR,
            [PAYMENT_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS.CASH,
          },
        },
      ],
      contractErrors: undefined,
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

describe("Payment", () => {
  it("Should dispaly form", () => {
    const store = initStore(INITIAL_STATE);
    const { getByText, getByPlaceholderText, queryByPlaceholderText } = render(
      <Provider store={store}>
        <Payment />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.product_price`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.payment_method`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.paypal`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
      )
    ).toBeTruthy();
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.name`
      )
    ).not.toBeTruthy();
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.card`
      )
    ).not.toBeTruthy();
  });
  it("Should dispaly external fields", () => {
    const initialState = INITIAL_STATE;
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.PAYMENT_METHOD
    ] = PAYMENT_METHODS.TRANSFER;
    const store = initStore(initialState);
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Payment />
      </Provider>
    );
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.name`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.card`
      )
    ).toBeTruthy();
  });
  it("Should dispath on initi and every field is changed", () => {
    actions.mockClear();
    const initialState = INITIAL_STATE;
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.PAYMENT_METHOD
    ] = PAYMENT_METHODS.TRANSFER;
    const store = initStore(initialState);
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Payment />
      </Provider>
    );

    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.CURRENCY,
        value: CURRENSY.EUR,
      })
    );
    const test_string = "test-string";
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.COST,
        value: test_string,
      })
    );
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.name`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.CARD_NAME,
        value: test_string,
      })
    );
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.card`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.CARD_NUMBER,
        value: test_string,
      })
    );
    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.paypal`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_METHOD,
        value: PAYMENT_METHODS.PAYPAL,
      })
    );
    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_METHOD,
        value: PAYMENT_METHODS.CASH,
      })
    );
    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_METHOD,
        value: PAYMENT_METHODS.TRANSFER,
      })
    );
  });
  it("Should dispatch validation", () => {
    const initialState = INITIAL_STATE;
    // @ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.PAYMENT]: {
        [PAYMENT_FIELDS.COST]: "some error",
      },
    };
    const store = initStore(initialState);
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Payment />
      </Provider>
    );
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`
      ),
      "test"
    );
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.PURCHASE, CONTRACT_SCREEN_TYPES.PAYMENT)
    );
  });
  it("Should not render on undefined contract type", () => {
    const initialState = INITIAL_STATE;
    // @ts-ignore
    initialState.contract.currentContract = undefined;
    const store = initStore(initialState);
    const { queryByPlaceholderText } = render(
      <Provider store={store}>
        <Payment />
      </Provider>
    );
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`
      )
    ).not.toBeTruthy();
  });
});

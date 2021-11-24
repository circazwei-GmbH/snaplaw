import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { PAYMENT_FIELDS } from "../../../../../store/modules/contract/types";
import { CURRENCY } from "../../../../../store/modules/contract/payment";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";
import OperatingCosts from "../OperatingCosts";

const INITIAL_STATE = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.OPERATING_COSTS,
          data: {
            [PAYMENT_FIELDS.CURRENCY]: CURRENCY.EUR,
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

describe("OperatingCosts", () => {
  it("Should dispaly form", () => {
    const store = initStore(INITIAL_STATE);
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <OperatingCosts />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.OPERATING_COSTS}.product_price`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.OPERATING_COSTS}.fields.cost`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.OPERATING_COSTS}.warning`
      )
    ).toBeTruthy();
  });
  it("Should dispath action on change", () => {
    actions.mockClear();
    const initialState = INITIAL_STATE;
    const store = initStore(initialState);
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <OperatingCosts />
      </Provider>
    );

    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.OPERATING_COSTS,
        fieldName: PAYMENT_FIELDS.CURRENCY,
        value: CURRENCY.EUR,
      })
    );
    const test_string = "test-string";
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.OPERATING_COSTS}.fields.cost`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.OPERATING_COSTS,
        fieldName: PAYMENT_FIELDS.COST,
        value: test_string,
      })
    );

    fireEvent(getByTestId("Picker"), "itemChange", { value: "value" });
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.OPERATING_COSTS,
        fieldName: PAYMENT_FIELDS.CURRENCY,
        value: "value",
      })
    );
  });
  it("Should dispatch validation", () => {
    const initialState = INITIAL_STATE;
    // @ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.OPERATING_COSTS]: {
        [PAYMENT_FIELDS.COST]: "some error",
      },
    };
    const store = initStore(initialState);
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <OperatingCosts />
      </Provider>
    );
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.OPERATING_COSTS}.fields.cost`
      ),
      "test"
    );
    expect(actions).toBeCalledWith(
      validateScreen(
        CONTRACT_TYPES.RENTAL,
        CONTRACT_SCREEN_TYPES.OPERATING_COSTS
      )
    );
  });
});

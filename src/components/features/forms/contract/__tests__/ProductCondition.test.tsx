import React from "react";
import {createStore} from "@reduxjs/toolkit";
import {fireEvent, render} from "@testing-library/react-native";
import {Provider} from "react-redux";
import ProductCondition from "../ProductCondition";
import {CONDITION_VALUE, CONDITIONS} from "../../../../../store/modules/contract/types";
import {CONTRACT_SCREEN_TYPES, CONTRACT_TYPES,} from "../../../../../store/modules/contract/constants";
import {setScreenData} from "../../../../../store/modules/contract/slice";
import {PRODUCT_CONDITION_FIELD_NAME} from "../../../../../store/modules/contract/purchase/product-condition";
import {validateScreen} from "../../../../../store/modules/contract/action-creators";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.PURCHASE,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION,
          data: {
            [PRODUCT_CONDITION_FIELD_NAME]: CONDITION_VALUE.NEW
          }
        }
      ],
    },
    contractErrors: {
      [CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION]: {
        [PRODUCT_CONDITION_FIELD_NAME]: ''
      }
    }
  },
};

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("ProductCondition", () => {
  it("Should dispaly all checkboxes", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductCondition />
      </Provider>
    );
    CONDITIONS.forEach((condition) => {
      expect(
        getByText(
          `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION}.checkboxes.${condition}`
        )
      ).toBeTruthy();
    });
  });
  it("Should call handler", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductCondition />
      </Provider>
    );
    CONDITIONS.forEach((condition) => {
      fireEvent.press(
        getByText(
          `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION}.checkboxes.${condition}`
        )
      );
      expect(actions).toBeCalledWith(
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION,
          fieldName: PRODUCT_CONDITION_FIELD_NAME,
          value: condition,
        })
      );
    });
  });
  it("Should dispatch validator", () => {
    initialState.contract.contractErrors[CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION][PRODUCT_CONDITION_FIELD_NAME] = 'some error'
    const { getByText } = render(
      <Provider store={store}>
        <ProductCondition />
      </Provider>
    );
    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION}.checkboxes.${CONDITION_VALUE.USED}`
      )
    );
    expect(actions).toBeCalledWith(validateScreen(CONTRACT_TYPES.PURCHASE, CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION))
  })
});

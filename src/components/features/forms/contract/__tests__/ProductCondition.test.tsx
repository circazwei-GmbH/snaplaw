import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import ProductCondition from "../ProductCondition";
import { CONDITIONS } from "../../../../../store/modules/contract/types";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import { PRODUCT_CONDITION_FIELD_NAME } from "../../../../../store/modules/contract/purchase/product-condition";

const initialState = {
  contract: {
    currentContract: {
      type: "some-type",
      screens: [],
    },
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
});

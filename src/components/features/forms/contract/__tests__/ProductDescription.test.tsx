import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import ProductDescriptionForm from "../ProductDescriptionForm";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import { PRODUCT_DESCRIPTION_FIELDS } from "../../../../../store/modules/contract/purchase/product-description";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.PURCHASE,
      screens: [],
    },
  },
};

const actions = jest.fn();

const reducer = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reducer);

describe("ProductDescription", () => {
  it("Should display checkbox", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductDescriptionForm />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.checkbox`
      )
    ).toBeTruthy();
  });
  it("Should call handler", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductDescriptionForm />
      </Provider>
    );
    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.checkbox`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
        fieldName: PRODUCT_DESCRIPTION_FIELDS.hasAccessories,
        value: true,
      })
    );
  });
});

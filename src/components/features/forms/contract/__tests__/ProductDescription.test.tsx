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
import { validateScreen } from "../../../../../store/modules/contract/action-creators";

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
  it("Should show additional field", () => {
    initialState.contract.currentContract.screens.push({
      //@ts-ignore
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
      data: {
        //@ts-ignore
        [PRODUCT_DESCRIPTION_FIELDS.hasAccessories]: true,
      },
    });
    const { getAllByPlaceholderText } = render(
      <Provider store={store}>
        <ProductDescriptionForm />
      </Provider>
    );
    expect(
      getAllByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
      ).length
    ).toEqual(2);
  });
  it("Should dispatch action on change data", () => {
    const { getAllByPlaceholderText } = render(
      <Provider store={store}>
        <ProductDescriptionForm />
      </Provider>
    );
    const test_value = "text";
    fireEvent.changeText(
      getAllByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
      )[0],
      test_value
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
        fieldName: PRODUCT_DESCRIPTION_FIELDS.description,
        value: test_value,
      })
    );

    fireEvent.changeText(
      getAllByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
      )[1],
      test_value
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
        fieldName: PRODUCT_DESCRIPTION_FIELDS.descriptionAccessories,
        value: test_value,
      })
    );
  });
  it("Should dispatch validation", () => {
    //@ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {
        [PRODUCT_DESCRIPTION_FIELDS.description]: "error",
      },
    };
    const { getAllByPlaceholderText } = render(
      <Provider store={store}>
        <ProductDescriptionForm />
      </Provider>
    );
    fireEvent.changeText(
      getAllByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
      )[0],
      "value"
    );
    expect(actions).toBeCalledWith(validateScreen(CONTRACT_TYPES.PURCHASE, CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION))
  });
  it("Should not show additional fields", () => {
    initialState.contract.currentContract.type = CONTRACT_TYPES.CAR;
    const { queryByText } = render(
      <Provider store={store}>
        <ProductDescriptionForm />
      </Provider>
    );

    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.checkbox`
      )
    ).toBeFalsy();
  });
});

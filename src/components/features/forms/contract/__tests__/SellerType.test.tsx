import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { 
  SELLER_TYPES, 
  SELLER_TYPE_FIELD_NAME, 
  SELLER_TYPE_VALUE 
} from "../../../../../store/modules/contract/carSales/seller-type";
import SellerType from "../SellerType";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.CAR,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.SELLER_TYPE,
          data: {
            [SELLER_TYPE_FIELD_NAME]: SELLER_TYPE_VALUE.COMMERCIAL,
          },
        },
      ],
    },
    contractErrors: {
      [CONTRACT_SCREEN_TYPES.SELLER_TYPE]: {
        [SELLER_TYPE_FIELD_NAME]: "",
      },
    },
  },
};

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("SellerType", () => {
  it("Should dispaly all checkboxes", () => {
    const { getByText } = render(
      <Provider store={store}>
        <SellerType />
      </Provider>
    );
    SELLER_TYPES.forEach((type) => {
      expect(
        getByText(
          `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SELLER_TYPE}.checkboxes.${type}`
        )
      ).toBeTruthy();
    });
  });
  it("Should call handler", () => {
    const { getByText } = render(
      <Provider store={store}>
        <SellerType />
      </Provider>
    );
    SELLER_TYPES.forEach((type) => {
      fireEvent.press(
        getByText(
          `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SELLER_TYPE}.checkboxes.${type}`
        )
      );
      expect(actions).toBeCalledWith(
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.SELLER_TYPE,
          fieldName: SELLER_TYPE_FIELD_NAME,
          value: type,
        })
      );
    });
  });
  it("Should dispatch validator", () => {
    initialState.contract.contractErrors[
      CONTRACT_SCREEN_TYPES.SELLER_TYPE
    ][SELLER_TYPE_FIELD_NAME] = "some error";
    const { getByText } = render(
      <Provider store={store}>
        <SellerType />
      </Provider>
    );
    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SELLER_TYPE}.checkboxes.${SELLER_TYPE_VALUE.COMMERCIAL}`
      )
    );
    expect(actions).toBeCalledWith(
      validateScreen(
        CONTRACT_TYPES.CAR,
        CONTRACT_SCREEN_TYPES.SELLER_TYPE
      )
    );
  });
});

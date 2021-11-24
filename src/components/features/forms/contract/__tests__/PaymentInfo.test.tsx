import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";
import {
  PAYMENT_INFO_FIELDS,
  PAYMENT_INFO_FIELDS_ARR,
} from "../../../../../store/modules/contract/carSales/payment-info";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import PaymentInfo from "../PaymentInfo";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.CAR,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.PAYMENT_INFO,
          data: {},
        },
      ],
    },
    contractErrors: undefined,
  },
};

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("PaymentInfo", () => {
  it("Should dispaly form", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentInfo />
      </Provider>
    );
    PAYMENT_INFO_FIELDS_ARR.forEach((field) => {
      expect(
        getByPlaceholderText(
          `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT_INFO}.placeholders.${field}`
        )
      ).toBeTruthy();
    });
  });
  it("Should dispatch action on change", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentInfo />
      </Provider>
    );
    const value = "value";
    PAYMENT_INFO_FIELDS_ARR.forEach((field) => {
      fireEvent.changeText(
        getByPlaceholderText(
          `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT_INFO}.placeholders.${field}`
        ),
        value
      );
      expect(actions).toBeCalledWith(
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.PAYMENT_INFO,
          fieldName: field,
          value,
        })
      );
    });
  });
  it("Should dispatch validation", () => {
    //@ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.PAYMENT_INFO]: {
        [PAYMENT_INFO_FIELDS.ACCOUNT_OWNER]: "some error",
      },
    };
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentInfo />
      </Provider>
    );
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT_INFO}.placeholders.${PAYMENT_INFO_FIELDS.ACCOUNT_OWNER}`
      ),
      "value"
    );
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.CAR, CONTRACT_SCREEN_TYPES.PAYMENT_INFO)
    );
  });
});

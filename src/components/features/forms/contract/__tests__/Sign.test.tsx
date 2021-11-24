import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Sign from "../Sign";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";
import { removeFromWaiter, setModal } from "../../../../../store/modules/main/slice";
import { BUTTON_COLORTYPE } from "../../../../../store/modules/main/types";
import { requestModalSign } from "../../../../../store/modules/contract/action-creators";
import { USER_DATA_FIELDS } from "../../../../../store/modules/contract/user-data";
import { SERVICES_DATA_FIELDS } from "../../../../../store/modules/contract/work/services-data";
import {
  PRODUCT_DESCRIPTION_FIELDS,
  CONFIRMATION_FIELDS,
  PRODUCT_DATA_FIELDS,
  PAYMENT_FIELDS
} from "../../../../../store/modules/contract/types";
import { clearErrors } from "../../../../../store/modules/contract/slice";
import { PRODUCT_CONDITION_FIELD_NAME } from "../../../../../store/modules/contract/purchase/product-condition";
import { SIGN_LOADER } from "../../../../../store/modules/contract/purchase/sign";
import { useNavigation } from "@react-navigation/core";
import { HOME_ROUTER } from "../../../../../router/HomeRouterType";

const text = "text";
const screens = [
  {
    type: CONTRACT_SCREEN_TYPES.USER_DATA,
    data: {
      [USER_DATA_FIELDS.name]: text,
      [USER_DATA_FIELDS.lastName]: text,
      [USER_DATA_FIELDS.dateOfBirth]: text,
      [USER_DATA_FIELDS.email]: text,
      [USER_DATA_FIELDS.phone]: text,
      [USER_DATA_FIELDS.address]: text,
      [USER_DATA_FIELDS.postCode]: text,
    },
  },
  {
    type: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
    data: {
      [PRODUCT_DATA_FIELDS.subject]: text,
      [PRODUCT_DATA_FIELDS.producer]: text,
      [PRODUCT_DATA_FIELDS.description]: text,
      [PRODUCT_DATA_FIELDS.serial]: text,
    },
  },
  {
    type: CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION,
    data: {
      [PRODUCT_CONDITION_FIELD_NAME]: text,
    },
  },
  {
    type: CONTRACT_SCREEN_TYPES.SERVICES,
    data: {
      [SERVICES_DATA_FIELDS.SERVICES_DATA]: [
        {
          [SERVICES_DATA_FIELDS.SERVICE_TITLE]: text,
          [SERVICES_DATA_FIELDS.SERVICE_DATE]: text,
        },
      ]
    },
  },
  {
    type: CONTRACT_SCREEN_TYPES.PAYMENT,
    data: {
      [PAYMENT_FIELDS.COST]: text,
      [PAYMENT_FIELDS.PAYMENT_METHOD]: text,
      [PAYMENT_FIELDS.CARD_NAME]: text,
      [PAYMENT_FIELDS.CARD_NUMBER]: text,
    },
  },
  {
    type: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
    data: {
      [PRODUCT_DESCRIPTION_FIELDS.description]: text,
    },
  },
  {
    type: CONTRACT_SCREEN_TYPES.CONFIRMATION,
    data: {
      [CONFIRMATION_FIELDS.FIRST]: text,
      [CONFIRMATION_FIELDS.SECOND]: text,
    },
  },
]

jest.mock("@react-navigation/native", () => {
  const navigation = {
    push: jest.fn(),
    pop: jest.fn(),
  };
  return {
    useNavigation: () => navigation,
  };
});

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.PURCHASE,
      screens: [],
      meRole: CONTRACT_ROLE.OWNER,
      id: 1,
    },
    signModal: false,
  },
  main: {
    waiter: {
      events: [],
      message: undefined,
    },
  },
};
const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("Sign", () => {
  it("Should dispaly a text", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Sign />
      </Provider>
    );

    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.SIGN}.signature`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.SIGN}.invite`
      )
    ).toBeTruthy();
  });
  it("Should dispatch clearErrors", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Sign />
      </Provider>
    );

    fireEvent.press(queryByTestId("SignInputPressID"));
    expect(actions).toBeCalledWith(clearErrors());
  });
  it("Should dispatch requestModalSign", () => {
    //@ts-ignore
    initialState.contract.currentContract.screens = screens;
    const { queryByTestId } = render(
      <Provider store={store}>
        <Sign />
      </Provider>
    );

    fireEvent.press(queryByTestId("SignInputPressID"));
    expect(actions).toBeCalledWith(
      requestModalSign(true)
    );
  });
  it("Should dispatch setModal", () => {
    initialState.contract.currentContract.type = CONTRACT_TYPES.WORK;
    const { queryByTestId } = render(
      <Provider store={store}>
        <Sign />
      </Provider>
    );

    fireEvent.press(queryByTestId("SignInputPressID"));
    expect(actions).toBeCalledWith(
      setModal({
        message: "contracts.confirmation_modal.confirm_contract_sign",
        actions: [
          {
            name: "contracts.confirmation_modal.buttons.check",
            colortype: BUTTON_COLORTYPE.ERROR,
          },
          {
            name: "contracts.confirmation_modal.buttons.sign",
            action: requestModalSign(true),
          },
        ],
      })
    );
  });
  it("Should not show text", () => {
    initialState.contract.currentContract.meRole = CONTRACT_ROLE.PARTNER;
    const {queryByText} = render(
      <Provider store={store}>
        <Sign />
      </Provider>
    );

    expect(queryByText(`contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SIGN}.invite`)).toBeFalsy();
  });
  it("Should execute useEffect", () => {
    initialState.contract.signModal = true;
    render(
      <Provider store={store}>
        <Sign />
      </Provider>
    );

    expect(actions).toBeCalledWith(requestModalSign(false));
    expect(actions).toBeCalledWith(removeFromWaiter({ event: SIGN_LOADER }));
  });
  it("Should not dispaly on empty contract", () => {
    // @ts-ignore
    initialState.contract.currentContract = undefined;
    const { queryByText } = render(
      <Provider store={store}>
        <Sign />
      </Provider>
    );

    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.SIGN}.signature`
      )
    ).not.toBeTruthy();
  });
});

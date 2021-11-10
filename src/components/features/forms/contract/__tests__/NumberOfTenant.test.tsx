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
  MEMBER_TYPES,
  MEMBER_TYPE_FIELD_NAME,
  MEMBER_TYPE_VALUE,
} from "../../../../../store/modules/contract/carSales/member-type";
import MemberType from "../MemberType";
import { NUMBER_OF_TENANTS_FIELDS } from "../../../../../store/modules/contract/number-of-tenants-data";
import NumberOfTenants from "../NumberOfTenants";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS,
          data: {},
        },
      ],
    },
    contractErrors: {
      [CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS]: {
        [NUMBER_OF_TENANTS_FIELDS.NUMBER]: "",
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

describe("NumberOfTenants", () => {
  it("Should dispaly form", () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <NumberOfTenants />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS}.text`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS}.switch`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS}.placeholder`
      )
    ).toBeTruthy();
  });
  it("Should call handler", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <NumberOfTenants />
      </Provider>
    );
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS}.placeholder`
      ),
      "text"
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS,
        fieldName: NUMBER_OF_TENANTS_FIELDS.NUMBER,
        value: "text",
      })
    );

    fireEvent(
      getByTestId(
        `Switch.contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS}.switch`
      ),
      "valueChange"
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS,
        fieldName: NUMBER_OF_TENANTS_FIELDS.NUMBER,
        value: "text",
      })
    );
  });
  it("Should dispatch validator", () => {
    initialState.contract.contractErrors[
      CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS
    ][NUMBER_OF_TENANTS_FIELDS.NUMBER] = "some error";

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <NumberOfTenants />
      </Provider>
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS}.placeholder`
      ),
      "text"
    );
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.RENTAL, CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS)
    );
  });
});

import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";
import AdditionalInfoRental from "../AdditionalInformationRental";
import { ADDITIONAL_INFO_RENTAL_FIELDS_ARR } from "../../../../../store/modules/contract/additional-info-rental-data";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO,
          data: {},
        },
      ],
      contractErrors: undefined,
    },
  },
};

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("AditionalInfoRental", () => {
  it("Should dispaly form", () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <AdditionalInfoRental />
      </Provider>
    );
    ADDITIONAL_INFO_RENTAL_FIELDS_ARR.forEach((field) =>
      expect(
        getByText(
          `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.checkboxes.${field}`
        )
      ).toBeTruthy()
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.text`
      )
    ).toBeTruthy();
  });
  it("Should dispath on action on toggle switcher", () => {
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={store}>
        <AdditionalInfoRental />
      </Provider>
    );

    ADDITIONAL_INFO_RENTAL_FIELDS_ARR.forEach((field) => {
      fireEvent(
        getByTestId(
          `Switch.contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.checkboxes.${field}`
        ),
        "valueChange"
      );

      expect(actions).toBeCalledWith(
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO,
          fieldName: field,
          value: true,
        })
      );
    });
  });
});

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
import DirectSupply from "../DirectSupply";
import { DIRECT_SUPPLY_FIELDS_ARR } from "../../../../../store/modules/contract/direct-supply-data";

const INITIAL_STATE = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY,
          data: {},
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

describe("DirectSupply", () => {
  it("Should dispaly form", () => {
    const store = initStore(INITIAL_STATE);
    const { getByText } = render(
      <Provider store={store}>
        <DirectSupply />
      </Provider>
    );
    DIRECT_SUPPLY_FIELDS_ARR.forEach((field) =>
      expect(
        getByText(
          `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY}.checkboxes.${field}`
        )
      ).toBeTruthy()
    );
  });
  it("Should dispatch action on check", () => {
    const store = initStore(INITIAL_STATE);
    const { getByTestId } = render(
      <Provider store={store}>
        <DirectSupply />
      </Provider>
    );
    DIRECT_SUPPLY_FIELDS_ARR.forEach(field => {
      fireEvent.press(getByTestId(field));

      expect(actions).toBeCalledWith(
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY,
          fieldName: field,
          value: true,
        })
      );
    });
  });
});

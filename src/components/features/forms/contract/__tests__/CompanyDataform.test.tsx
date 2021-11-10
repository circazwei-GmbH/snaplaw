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
import { validateScreen } from "../../../../../store/modules/contract/action-creators";
import CompanyDataForm from "../CompanyDataForm";
import {
  COMPANY_DATA_FIELDS,
  COMPANY_DATA_FIELDS_ARR,
} from "../../../../../store/modules/contract/company-data";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.CAR,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.COMPANY_DATA,
          data: {},
        },
      ],
    },
  },
};

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("CompanyDataForm", () => {
  it("Should dispaly form", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <CompanyDataForm />
      </Provider>
    );

    COMPANY_DATA_FIELDS_ARR.forEach((field) => {
      expect(
        getByPlaceholderText(
          `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.COMPANY_DATA}.placeholders.${field}`
        )
      ).toBeTruthy();
    });
  });
  it("Should dispath action on change", () => {
    actions.mockClear();
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <CompanyDataForm />
      </Provider>
    );

    const test_string = "test";

    COMPANY_DATA_FIELDS_ARR.forEach((field) => {
      fireEvent.changeText(
        getByPlaceholderText(
          `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.COMPANY_DATA}.placeholders.${field}`
        ),
        test_string
      );
      expect(actions).toBeCalledWith(
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.COMPANY_DATA,
          fieldName: field,
          value: test_string,
        })
      );
    });
  });
  it("Should dispatch validation", () => {
    // @ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.COMPANY_DATA]: {
        [COMPANY_DATA_FIELDS.companyName]: "some error",
      },
    };

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <CompanyDataForm />
      </Provider>
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.COMPANY_DATA}.placeholders.${COMPANY_DATA_FIELDS.companyName}`
      ),
      "test"
    );
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.CAR, CONTRACT_SCREEN_TYPES.COMPANY_DATA)
    );
  });
});

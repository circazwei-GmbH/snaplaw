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

import ProductDataForm from "../ProductDataForm";
import { PRODUCT_DATA_FIELDS } from "../../../../../store/modules/contract/types";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.PURCHASE,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
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

describe("ProductDataForm", () => {
  it("Should dispaly form", () => {
    const { getByPlaceholderText, queryByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <ProductDataForm />
      </Provider>
    );

    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.subject`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.producer`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.designation`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
      )
    ).toBeTruthy();
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
      )
    ).toBeNull();
  });
  it("Should dispath action on change fields", () => {
    actions.mockClear();
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <ProductDataForm />
      </Provider>
    );

    const test_string = "test";

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.subject`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: PRODUCT_DATA_FIELDS.subject,
        value: test_string,
      })
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.producer`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: PRODUCT_DATA_FIELDS.producer,
        value: test_string,
      })
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.designation`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: PRODUCT_DATA_FIELDS.description,
        value: test_string,
      })
    );

    fireEvent(
      getByTestId(
        `Switch.contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
      ),
      "valueChange"
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: PRODUCT_DATA_FIELDS.isSerial,
        value: true,
      })
    );
  });
  it("Should dispaly additional fields", () => {
    // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PRODUCT_DATA_FIELDS.isSerial
    ] = true;
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <ProductDataForm />
      </Provider>
    );

    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
      )
    ).toBeTruthy();
  });
  it("Should dispatch action on additional field", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <ProductDataForm />
      </Provider>
    );

    const test_string = "test";

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: PRODUCT_DATA_FIELDS.serial,
        value: test_string,
      })
    );
  });
  it("Should dispatch validation", () => {
    // @ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.PRODUCT_DATA]: {
        [PRODUCT_DATA_FIELDS.producer]: "some error",
      },
    };

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <ProductDataForm />
      </Provider>
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.producer`
      ),
      "test"
    );
    expect(actions).toBeCalledWith(
      validateScreen(
        CONTRACT_TYPES.PURCHASE,
        CONTRACT_SCREEN_TYPES.PRODUCT_DATA
      )
    );
  });
  it("Should execute useEffect", () => {
    // @ts-ignore
    initialState.contract = {}

    const { } = render(
      <Provider store={store}>
        <ProductDataForm />
      </Provider>
    );
  });
});

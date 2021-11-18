import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { CAR_DATA_FIELDS } from "../../../../../store/modules/contract/carSales/car-data";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";
import ProductDataCarForm from "../ProdactDataCarForm";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";
import { requestCarInformation } from "../../../../../store/modules/lib/action-creators";

const initialState = {
  lib: {
    carInfo: {
      producer: [
        { key: "producer-1", value: "producer-1" },
        { key: "producer-2", value: "producer-2" },
        { key: "producer-3", value: "producer-3" },
      ],
      model: [
        { key: "model-1", value: "model-1" },
        { key: "model-2", value: "model-2" },
        { key: "model-3", value: "model-3" },
      ],
      type: [
        { key: "type-1", value: "type-1" },
        { key: "type-2", value: "type-2" },
        { key: "type-3", value: "type-3" },
      ],
      year: [
        { key: "year-1", value: "year-1" },
        { key: "year-2", value: "year-2" },
        { key: "year-3", value: "year-3" },
      ],
    },
  },
  contract: {
    currentContract: {
      id: "0",
      type: CONTRACT_TYPES.CAR,
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

describe("ProductDataCarForm", () => {
  it("Should dispaly form", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <ProductDataCarForm />
      </Provider>
    );

    expect(
      getByTestId(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.producer`
      )
    ).toBeTruthy();
    expect(
      getByTestId(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.model`
      )
    ).toBeTruthy();
    expect(
      getByTestId(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.type`
      )
    ).toBeTruthy();
    expect(
      getByTestId(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.year`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.prevRegistrationNumber`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serialNumber`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.run`
      )
    ).toBeTruthy();
  });
  it("Should dispath action on change", () => {
    actions.mockClear();
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <ProductDataCarForm />
      </Provider>
    );

    const test_string = "test";

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.run`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: CAR_DATA_FIELDS.run,
        value: test_string,
      })
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.prevRegistrationNumber`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: CAR_DATA_FIELDS.prevRegistrationNumber,
        value: test_string,
      })
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serialNumber`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: CAR_DATA_FIELDS.serialNumber,
        value: test_string,
      })
    );

    fireEvent.press(getByTestId("producer-1"));
    fireEvent.press(getByTestId(`DoneButton.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.producer`));
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: CAR_DATA_FIELDS.producer,
        value: "producer-1",
      })
    );

    fireEvent.press(getByTestId("model-1"));
    fireEvent.press(getByTestId(`DoneButton.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.model`));
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: CAR_DATA_FIELDS.model,
        value: "model-1",
      })
    );

    fireEvent.press(getByTestId("type-1"));
    fireEvent.press(getByTestId(`DoneButton.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.type`));
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: CAR_DATA_FIELDS.type,
        value: "type-1",
      })
    );

    fireEvent.press(getByTestId("year-1"));
    fireEvent.press(getByTestId(`DoneButton.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.year`));
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: CAR_DATA_FIELDS.year,
        value: "year-1",
      })
    );
  });
  it("Should dispatch validation", () => {
    // @ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.PRODUCT_DATA]: {
        [CAR_DATA_FIELDS.run]: "some error",
      },
    };

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <ProductDataCarForm />
      </Provider>
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.run`
      ),
      "test"
    );
    expect(actions).toBeCalledWith(
      validateScreen(
        CONTRACT_TYPES.CAR,
        CONTRACT_SCREEN_TYPES.PRODUCT_DATA
      )
    );
  });
  it("Should execute useEffect", () => {
    actions.mockClear();
    // @ts-ignore
    initialState.lib.carInfo.producer = []

    const { } = render(
      <Provider store={store}>
        <ProductDataCarForm />
      </Provider>
    );

    expect(actions).toBeCalledWith(
      requestCarInformation("0")
    );
  });
});

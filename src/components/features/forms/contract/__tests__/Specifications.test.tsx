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
import Specifications from "../Specifications";
import { SPECIFICATIONS_DATA_FIELDS } from "../../../../../store/modules/contract/specifications-data";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.CAR,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
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

describe("Specifications", () => {
  it("Should dispaly form", () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Specifications />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.inspection`
      )
    ).toBeTruthy();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.inspectionDate`
      )
    ).toBeNull();
  });
  it("Should dispath on action on toggle specification", () => {
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={store}>
        <Specifications />
      </Provider>
    );

    fireEvent(getByTestId(
      `Switch.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.inspection`
    ), "valueChange");

    expect(actions.mock.calls[0][0]).toEqual(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
        fieldName: SPECIFICATIONS_DATA_FIELDS.INSPECTION,
        value: true,
      })
    );
  });
  it("Should dispaly external fields", () => {
      // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      SPECIFICATIONS_DATA_FIELDS.INSPECTION
    ] = true;
      // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      SPECIFICATIONS_DATA_FIELDS.DEREGISTERED
    ] = true;
    const { getByText } = render(
      <Provider store={store}>
        <Specifications />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.inspectionDate`
      )
    ).toBeTruthy();
    
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.deregisteredDate`
      )
    ).toBeTruthy();
  });
});

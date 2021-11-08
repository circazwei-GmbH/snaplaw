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
import { ADDITIONAL_INFO_CAR_FIELDS } from "../../../../../store/modules/contract/additional-info-car-data";
import AdditionalInfoCar from "../AdditionalInformationCar";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.CAR,
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

describe("AditionalInfoCar", () => {
  it("Should dispaly form", () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <AdditionalInfoCar />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.fields.accidentDamage`
      )
    ).toBeTruthy();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.damage.title`
      )
    ).toBeNull();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.fields.otherDefects`
      )
    ).toBeTruthy();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.defect.title`
      )
    ).toBeNull();
  });
  it("Should dispath on action on toggle switcher", () => {
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={store}>
        <AdditionalInfoCar />
      </Provider>
    );

    fireEvent(getByTestId(
      `Switch.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.fields.accidentDamage`
    ), "valueChange");

    expect(actions.mock.calls[0][0]).toEqual(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO,
        fieldName: ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE,
        value: true,
      })
    );
  });
  it("Should dispaly external fields", () => {
      // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE
    ] = true;
      // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      ADDITIONAL_INFO_CAR_FIELDS.OTHER_DEFECTS
    ] = true;
    const { getByText } = render(
      <Provider store={store}>
        <AdditionalInfoCar />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.damage.title`
      )
    ).toBeTruthy();
    
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.defect.title`
      )
    ).toBeTruthy();
  });
});

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
import { ABOUT_HOUSING_RENTAL_FIELDS } from "../../../../../store/modules/contract/additional-info-RENTAL-data";
import AdditionalInfoRENTAL from "../AdditionalInformationRENTAL";
import AboutHousing from "../AboutHousingForm";
import { HOUSING_DATA_FIELDS } from "../../../../../store/modules/contract/housing-data";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.ABOUT_HOUSING,
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

describe("AboutHousing", () => {
  it("Should dispaly form", () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Provider store={store}>
        <AboutHousing />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.isFurnished`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.area`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.roomsNumber`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.location`
      )
    ).toBeTruthy();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.furnished.warning`
      )
    ).toBeNull();
  });
  it("Should dispath on action on change", () => {
    actions.mockClear();
    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <AboutHousing />
      </Provider>
    );

    fireEvent(
      getByTestId(
        `Switch.contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.isFurnished`
      ),
      "valueChange"
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.ABOUT_HOUSING,
        fieldName: HOUSING_DATA_FIELDS.IS_FURNISHED,
        value: true,
      })
    );

    const test_string = "test"

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.area`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.ABOUT_HOUSING,
        fieldName: HOUSING_DATA_FIELDS.AREA,
        value: test_string,
      })
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.roomsNumber`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.ABOUT_HOUSING,
        fieldName: HOUSING_DATA_FIELDS.ROOMS_NUMBER,
        value: test_string,
      })
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.location`
      ),
      test_string
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.ABOUT_HOUSING,
        fieldName: HOUSING_DATA_FIELDS.LOCATION,
        value: test_string,
      })
    );
  });
  it("Should dispaly external fields", () => {
      // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      HOUSING_DATA_FIELDS.IS_FURNISHED
    ] = true;
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <AboutHousing />
      </Provider>
    );

    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.furnished.warning`
      )
    ).toBeTruthy();

    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.furnished.placeholder`
      )
    ).toBeTruthy();
  });
  it("Should dispatch validation", () => {
    // @ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.ABOUT_HOUSING]: {
        [HOUSING_DATA_FIELDS.AREA]: "some error",
      },
    };

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AboutHousing />
      </Provider>
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.area`
      ),
      "test"
    );
    expect(actions).toBeCalledWith(
      validateScreen(
        CONTRACT_TYPES.RENTAL,
        CONTRACT_SCREEN_TYPES.ABOUT_HOUSING
      )
    );
  });
});

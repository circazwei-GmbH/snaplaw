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
import SecondaryRooms from "../SecondaryRooms";
import { 
  SECONDARY_ROOMS_FIELDS, 
  SECONDARY_ROOMS_FIELDS_ARR 
} from "../../../../../store/modules/contract/secondary-rooms-data";

const INITIAL_STATE = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS,
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

describe("SecondaryRooms", () => {
  it("Should dispaly form", () => {
    const store = initStore(INITIAL_STATE);
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <SecondaryRooms />
      </Provider>
    );
    SECONDARY_ROOMS_FIELDS_ARR.forEach((field) =>
      expect(
        getByText(
          `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}.checkboxes.${field}`
        )
      ).toBeTruthy()
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}.uploadFiles`
      )
    ).toBeTruthy();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}.titleMultiline`
      )
    ).not.toBeTruthy();
  });
  it("Should dispatch action on check", () => {
    const store = initStore(INITIAL_STATE);
    const { getByTestId } = render(
      <Provider store={store}>
        <SecondaryRooms />
      </Provider>
    );
    SECONDARY_ROOMS_FIELDS_ARR.forEach(field => {
      fireEvent.press(getByTestId(field));

      expect(actions).toBeCalledWith(
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS,
          fieldName: field,
          value: true,
        })
      );
    });
  });
  it("Should dispaly external fields and dispatch action on change", () => {
    const initialState = INITIAL_STATE;
    initialState.contract.currentContract.screens[0].data.[SECONDARY_ROOMS_FIELDS.OTHER] = true;
    const store = initStore(initialState);
    const { queryByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <SecondaryRooms />
      </Provider>
    );
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}.titleMultiline`
      )
    ).toBeTruthy();
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}.placeholder`
      ),
      "test_string"
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS,
        fieldName: SECONDARY_ROOMS_FIELDS.DESCRIPTION,
        value: "test_string",
      })
    );
  });
  it("Should dispatch validator", () => {
    const initialState = INITIAL_STATE;
    initialState.contract.currentContract.screens[0].data.[SECONDARY_ROOMS_FIELDS.OTHER] = true;
    initialState.contract = {
      ...initialState.contract,
      // @ts-ignore
      contractErrors: {
        [CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS]: {
          [SECONDARY_ROOMS_FIELDS.DESCRIPTION]: "some error"
        }
      }
    }
    const store = initStore(initialState);
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SecondaryRooms />
      </Provider>
    );
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}.placeholder`
      ),
      "test_string"
    );
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.RENTAL, CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS)
    );
  });
});

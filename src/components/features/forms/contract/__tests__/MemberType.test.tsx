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
  MEMBER_TYPE_VALUE 
} from "../../../../../store/modules/contract/carSales/member-type";
import MemberType from "../MemberType";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.CAR,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.MEMBER_TYPE,
          data: {
            [MEMBER_TYPE_FIELD_NAME]: MEMBER_TYPE_VALUE.COMMERCIAL,
          },
        },
      ],
    },
    contractErrors: {
      [CONTRACT_SCREEN_TYPES.MEMBER_TYPE]: {
        [MEMBER_TYPE_FIELD_NAME]: "",
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

describe("MemberType", () => {
  it("Should dispaly all checkboxes", () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemberType />
      </Provider>
    );
    MEMBER_TYPES.forEach((type) => {
      expect(
        getByText(
          `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.checkboxes.${type}`
        )
      ).toBeTruthy();
    });
  });
  it("Should call handler", () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemberType />
      </Provider>
    );
    MEMBER_TYPES.forEach((type) => {
      fireEvent.press(
        getByText(
          `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.checkboxes.${type}`
        )
      );
      expect(actions).toBeCalledWith(
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.MEMBER_TYPE,
          fieldName: MEMBER_TYPE_FIELD_NAME,
          value: type,
        })
      );
    });
  });
  it("Should dispatch validator", () => {
    initialState.contract.contractErrors[
      CONTRACT_SCREEN_TYPES.MEMBER_TYPE
    ][MEMBER_TYPE_FIELD_NAME] = "some error";
    const { getByText } = render(
      <Provider store={store}>
        <MemberType />
      </Provider>
    );
    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.checkboxes.${MEMBER_TYPE_VALUE.COMMERCIAL}`
      )
    );
    expect(actions).toBeCalledWith(
      validateScreen(
        CONTRACT_TYPES.CAR,
        CONTRACT_SCREEN_TYPES.MEMBER_TYPE
      )
    );
  });
});

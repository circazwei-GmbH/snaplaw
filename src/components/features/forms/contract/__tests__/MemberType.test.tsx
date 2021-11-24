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
  MEMBER_TYPE_VALUE,
} from "../../../../../store/modules/contract/carSales/member-type";
import MemberType from "../MemberType";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";

const initialState = {
  contract: {
    currentContract: {
      meRole: CONTRACT_ROLE.OWNER,
      type: CONTRACT_TYPES.CAR,
      screens: [],
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
  it("Should dispatch action on component init", () => {
    const {} = render(
      <Provider store={store}>
        <MemberType />
      </Provider>
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.MEMBER_TYPE,
        fieldName: MEMBER_TYPE_FIELD_NAME,
        value: MEMBER_TYPE_VALUE.COMMERCIAL,
      })
    );
  });
  it("Should dispaly all checkboxes", () => {
    initialState.contract.currentContract.screens = [
      {
        type: CONTRACT_SCREEN_TYPES.MEMBER_TYPE,
        data: {
          [MEMBER_TYPE_FIELD_NAME]: MEMBER_TYPE_VALUE.COMMERCIAL,
        },
      },
    ];
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
  it("Should dispaly additional text", () => {
    initialState.contract.currentContract.meRole = CONTRACT_ROLE.PARTNER;
    const { getByText } = render(
      <Provider store={store}>
        <MemberType />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.buyerWarning.fee`
      )
    ).toBeTruthy();
  });
  it("Should dispaly additional text with price", () => {
    initialState.contract.currentContract.screens.push({
      type: CONTRACT_SCREEN_TYPES.PAYMENT,
      data: {
        price: "price",
      }
    })
    const { getByText } = render(
      <Provider store={store}>
        <MemberType />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.buyerWarning.feecontracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.buyerWarning.calculation`
      )
    ).toBeTruthy();
  });
  it("Should dispatch validator", () => {
    initialState.contract.contractErrors[CONTRACT_SCREEN_TYPES.MEMBER_TYPE][
      MEMBER_TYPE_FIELD_NAME
    ] = "some error";
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
      validateScreen(CONTRACT_TYPES.CAR, CONTRACT_SCREEN_TYPES.MEMBER_TYPE)
    );
  });
  it("Should not dispaly component", () => {
    //@ts-ignore
    initialState.contract.currentContract = null;
    const { queryByText } = render(
      <Provider store={store}>
        <MemberType />
      </Provider>
    );
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.secondTitle`
      )
    ).toBeFalsy();
  });
});

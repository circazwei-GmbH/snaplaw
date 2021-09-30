import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Sign from "../Sign";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";

jest.mock("@react-navigation/native", () => {
  const navigation = {
    push: jest.fn(),
    pop: jest.fn(),
  };
  return {
    useNavigation: () => navigation,
  };
});

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.PURCHASE,
      screens: [],
      meRole: CONTRACT_ROLE.OWNER,
    },
  },
  main: {
    waiter: [],
  },
};
const reduser = () => initialState;
const store = createStore(reduser);

describe("Sign", () => {
  it("Should dispaly a text", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Sign />
      </Provider>
    );

    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.SIGN}.signature`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.SIGN}.invite`
      )
    ).toBeTruthy();
  });
  it("test", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Sign />
      </Provider>
    );
    fireEvent.press(queryByTestId("SignInputPressID"));
    expect(true).toBeTruthy();
  });
  it("Should not dispaly on empty contract", () => {
    // @ts-ignore
    initialState.contract.currentContract = undefined;
    const { queryByText } = render(
      <Provider store={store}>
        <Sign />
      </Provider>
    );

    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.SIGN}.signature`
      )
    ).not.toBeTruthy();
  });
});

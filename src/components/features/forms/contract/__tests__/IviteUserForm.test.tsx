import { render } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import InviteUserForm from "../InviteUserForm";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.CAR,
    },
  },
};

const reduser = (state = initialState) => {
  return initialState;
};

const store = createStore(reduser);

describe("InviteUserForm", () => {
  it("Should display form", () => {
    const { getByText } = render(
      <Provider store={store}>
        <InviteUserForm />
      </Provider>
    );

    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.INVITE_USER}.titleTwo`
      )
    ).toBeTruthy();
  });
  it("Should display form", () => {
    //@ts-ignore
    initialState.contract.currentContract = null;
    const { queryByText } = render(
      <Provider store={store}>
        <InviteUserForm />
      </Provider>
    );

    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.INVITE_USER}.titleTwo`
      )
    ).toBeFalsy();
  });
});

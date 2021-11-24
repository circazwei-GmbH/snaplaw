import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import InviteUserForm from "../InviteUserForm";
import * as RootNavigation from "../../../../../router/RootNavigation";
import { HOME_ROUTER } from "../../../../../router/HomeRouterType";

jest.mock("../../../../../router/RootNavigation");

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.CAR,
      id: 1,
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
  it("Should redirect", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <InviteUserForm />
      </Provider>
    );

    fireEvent.press(getByTestId("InvitePressabelAreaID"));
    expect(RootNavigation.navigate).toBeCalledWith(HOME_ROUTER.INVITE, { contractId: initialState.contract.currentContract.id })
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

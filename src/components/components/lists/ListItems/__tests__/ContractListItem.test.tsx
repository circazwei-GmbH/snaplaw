import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ContractListItem from "../ContactListItem";
import dayjs from "dayjs";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { CONTRACT_TYPES } from "../../../../../store/modules/contract/constants";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";
import { LANGUAGE_ENGLISH } from "../../../../../store/modules/profile/constants";
import { setPdfViewOnListContract } from "../../../../../store/modules/contract/slice";
import { getListItemAction } from "../../../../../services/contract/actions-config";
import { useI18n } from "../../../../../translator/i18n";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const ITEM = {
  title: "title",
  type: CONTRACT_TYPES.PURCHASE,
  createdAt: "12/21",
  id: "t",
  partnerId: "partnerId",
  ownerId: "ownerId",
  finalizedAt: undefined,
  meRole: CONTRACT_ROLE.OWNER,
};

const initialState = {
  contract: {
    pdfViewOnListContract: {
      id: "test",
      screens: [],
    },
  },
  profile: {
    language: LANGUAGE_ENGLISH,
  },
};

const actions = jest.fn();
const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return state;
};

const state = createStore(reduser);

describe("ContractListItem", () => {
  it("Should display elements", () => {
    const { getByText } = render(
      <Provider store={state}>
        <ContractListItem item={ITEM} />
      </Provider>
    );
    expect(getByText(`contracts.${ITEM.type}.title`)).toBeTruthy();
    expect(getByText(ITEM.title)).toBeTruthy();
    expect(getByText(dayjs(ITEM.createdAt).format("DD/MM/YYYY"))).toBeTruthy();
  });
  it("Should open and close modal", () => {
    const { getByText, getByTestId } = render(
      <Provider store={state}>
        <ContractListItem item={ITEM} />
      </Provider>
    );
    expect(getByTestId("Menu").props.visible).toBeFalsy();
    fireEvent.press(getByTestId("dots-three-vertical"));
    expect(getByTestId("Menu").props.visible).toBeTruthy();
    fireEvent.press(getByText("menu.cancel"));
    expect(getByTestId("Menu").props.visible).toBeFalsy();
  });
  it("Should dipatch action on close contract view", () => {
    const { getByText } = render(
      <Provider store={state}>
        <ContractListItem item={ITEM} />
      </Provider>
    );
    fireEvent.press(getByText("contracts.pdf_view.cancel"));
    expect(actions).toBeCalledWith(setPdfViewOnListContract(undefined));
  });
  it("Should dispatch actions on menu button press", () => {
    const { getByText } = render(
      <Provider store={state}>
        <ContractListItem item={ITEM} />
      </Provider>
    );
    getListItemAction(ITEM).map(
      ({ action }) => {
        fireEvent.press(getByText(action.title));
        expect(actions).toBeCalledWith(action.handler(ITEM, useI18n().t))
      }
    ); 
  });
});

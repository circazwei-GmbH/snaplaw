import React from "react";
import { render } from "@testing-library/react-native";
import ContractListItem from "../ContactListItem";
import dayjs from "dayjs";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { CONTRACT_TYPES } from "../../../../../store/modules/contract/constants";

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
};

const actions = jest.fn();
const reduser = (state = {}, action: unknown) => {
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
});

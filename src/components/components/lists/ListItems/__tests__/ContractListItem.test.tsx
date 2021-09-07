import React from "react";
import { render } from "@testing-library/react-native";
import ContractListItem from "../ContactListItem";

const ITEM = {
  title: "title",
  type: "type",
  createdAt: "12/21",
};

describe("ContractListItem", () => {
  it("Should display elements", () => {
    const { getByText } = render(<ContractListItem item={ITEM} />);
    expect(getByText(ITEM.type)).toBeTruthy();
    expect(getByText(ITEM.title)).toBeTruthy();
    expect(getByText(ITEM.createdAt)).toBeTruthy();
  });
});

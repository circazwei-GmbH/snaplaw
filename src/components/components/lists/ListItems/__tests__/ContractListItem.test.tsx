import React from "react";
import { render } from "@testing-library/react-native";
import ContractListItem from "../ContactListItem";
import dayjs from "dayjs";

const ITEM = {
  title: "title",
  type: "type",
  createdAt: "12/21",
  id: 't',
  contractor: undefined
};

describe("ContractListItem", () => {
  it("Should display elements", () => {
    const { getByText } = render(<ContractListItem item={ITEM} />);
    expect(getByText(`contracts.${ITEM.type}.title`)).toBeTruthy();
    expect(getByText(ITEM.title)).toBeTruthy();
    expect(getByText(dayjs(ITEM.createdAt).format('DD/MM/YYYY'))).toBeTruthy();
  });
});

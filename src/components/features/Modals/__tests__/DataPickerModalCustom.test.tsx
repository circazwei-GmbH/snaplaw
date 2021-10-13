import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { CONTRACT_LIST_STATE } from "../../../../store/modules/contract/types";
import DatePickerModalCustom from "../DatePickerModalCustom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { setContractsListFilters } from "../../../../store/modules/contract/slice";
import { requestContractsList } from "../../../../store/modules/contract/action-creators";
import dayjs from "dayjs";
import { CONTRACT_TYPES } from "../../../../store/modules/contract/constants";

describe("DataPickerModalCustom", () => {
  it("Should open data-picker", () => {
    const handler = jest.fn();
    const { getByText } = render(
        <DatePickerModalCustom
          setedDate=""
          datePickerOpened={true}
          onCancelDate={handler}
          onConfirmDate={() => {}}
          setDatePickerOpened={() => {}}
        />
    );

    fireEvent.press(getByText("menu.cancel"));
    expect(handler).toBeCalled();
  });
  it("Should close data-picker", () => {
    const handler = jest.fn();
    const { getByText } = render(
        <DatePickerModalCustom
          setedDate=""
          datePickerOpened={true}
          onConfirmDate={handler}
          onCancelDate={() => {}}
          setDatePickerOpened={() => {}}
        />
    );

    fireEvent.press(getByText("menu.confirm"));
    expect(handler).toBeCalled();
  });
});

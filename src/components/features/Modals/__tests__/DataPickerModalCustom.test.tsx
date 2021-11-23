import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import DatePickerModalCustom from "../DatePickerModalCustom";

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

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import CalendarInput from "../CalendarInput";

describe("CalensarInput", () => {
  it("Should be dispay name", () => {
    const { getByText } = render(
      <CalendarInput
        date={`${new Date()}`}
        placeholder="Date"
        dateHandler={() => {}}
      />
    );
    expect(getByText("Date*")).toBeTruthy();
  });
  it("Should open modal", () => {
    const { getByTestId, getByText } = render(
      <CalendarInput
        date={`${new Date()}`}
        placeholder="Date"
        dateHandler={() => {}}
      />
    );

    expect(getByTestId("DatePickerModal").props.visible).toBeFalsy();
    fireEvent.press(getByTestId("DataPickerPressabelAreaID"));
    expect(getByTestId("DatePickerModal").props.visible).toBeTruthy();
    fireEvent.press(getByText("menu.cancel"));
    expect(getByTestId("DatePickerModal").props.visible).toBeFalsy();
  });
});

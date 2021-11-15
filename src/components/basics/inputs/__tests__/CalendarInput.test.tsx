import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import InviteInput from "../InviteInput";
import CalendarInput from "../CalendarInput";

describe("CalensarInput", () => {
  it("Should be dispay name", () => {
    const { getByText } = render(
      <CalendarInput date={`${new Date()}`} placeholder="Date" dateHandler={()=>{}}/>
    );
    expect(getByText("Date*")).toBeTruthy();
  });
  it("Should call handler", () => {
    const { toJSON, getByText, getByTestId } = render(
      <CalendarInput date={`${new Date()}`} placeholder="Date" dateHandler={()=>{}} />
    );
    fireEvent.press(getByTestId("DataPickerPressabelAreaID"));
    fireEvent.press(getByText("menu.cancel"));
    expect(toJSON()).toMatchSnapshot();
  });
});

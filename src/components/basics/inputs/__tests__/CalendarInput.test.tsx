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
});

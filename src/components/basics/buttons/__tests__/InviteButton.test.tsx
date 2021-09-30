import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InviteButton from "../InviteButton";
import * as RootNavigation from "../../../../router/RootNavigation";

jest.mock("../../../../router/RootNavigation");

describe("InviteButton", () => {
  it("Should call navigation", () => {
    const { getByTestId } = render(
      <InviteButton contractId="testContractId" />
    );

    fireEvent.press(getByTestId("InviteButton"));
    expect(RootNavigation.navigate).toBeCalled();
  });
  it("Should not render on empty contract id", () => {
    const { getByTestId } = render(<InviteButton contractId={""} />);
    //@ts-ignore
    RootNavigation.navigate.mockClear();
    fireEvent.press(getByTestId("InviteButton"));
    expect(RootNavigation.navigate).not.toBeCalled();
  });
});

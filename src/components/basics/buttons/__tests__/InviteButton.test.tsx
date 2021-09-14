import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InviteButton from "../InviteButton";
import * as RootNavigation from "../../../../router/RootNavigation";

jest.mock("../../../../router/RootNavigation");

describe("InviteButton", () => {
  it("Should call navigation", () => {
    const { getByTestId } = render(<InviteButton />);

    fireEvent.press(getByTestId("InviteButton"));
    expect(RootNavigation.navigate).toBeCalled();
  });
});

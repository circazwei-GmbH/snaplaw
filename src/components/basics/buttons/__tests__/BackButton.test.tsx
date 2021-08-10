import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BackButton from "../BackButton";
import * as RootNavigation from "../../../../router/RootNavigation";

jest.mock("../../../../router/RootNavigation");

describe("BackButton", () => {
  it("Should navigate back", () => {
    const { getByTestId } = render(<BackButton />);

    fireEvent.press(getByTestId("BackButton.back"));
    expect(RootNavigation.pop).toBeCalled();
  });
});

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ContractViewButton from "../ContractViewButton";

describe("ContractNextButton", () => {
  it("Should display Text", () => {
    const { getByText } = render(<ContractViewButton onPress={jest.fn()} />);
    expect(getByText("contracts.buttons.view")).toBeTruthy();
  });
  it("Should call handler", () => {
    const handler = jest.fn();
    const { getByText } = render(<ContractViewButton onPress={handler} />);
    fireEvent.press(getByText("contracts.buttons.view"));
    expect(handler).toBeCalled();
  });
});

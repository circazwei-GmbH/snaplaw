import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ContractNextButton from "../ContractNextButton";

describe("ContractNextButton", () => {
  it("Should display Text", () => {
    const { getByText } = render(<ContractNextButton onPress={jest.fn()} />);
    expect(getByText("contracts.buttons.next")).toBeTruthy();
  });
  it("Should call handler", () => {
    const handler = jest.fn();
    const { getByText } = render(<ContractNextButton onPress={handler} />);
    fireEvent.press(getByText("contracts.buttons.next"));
    expect(handler).toBeCalled();
  });
});

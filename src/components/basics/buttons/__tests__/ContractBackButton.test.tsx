import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ContractBackButton from "../ContractBackButton";

describe("ContractBackButton", () => {
  it("Should diaplay text", () => {
    const { getByText } = render(<ContractBackButton onPress={jest.fn()} />);
    expect(getByText("contracts.buttons.back")).toBeTruthy();
  });
  it("Should call handler", () => {
    const handler = jest.fn();
    const { getByText } = render(<ContractBackButton onPress={handler} />);
    fireEvent.press(getByText("contracts.buttons.back"));
    expect(handler).toBeCalled();
  });
});

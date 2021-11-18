import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import PasswordField from "../PasswordField";
import PaymentPrice from "../PaymentPrice";
import { CURRENCY } from "../../../store/modules/contract/payment";

const testText = "TEXT";

describe("PasswordField", () => {
  it("Should view", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <PaymentPrice
        defaultText="defaultText"
        cost="cost"
        currentCurrency={CURRENCY.EUR}
        placeholder="TestField"
        onValueChange={handler}
        onChangeFunction={jest.fn}
      />
    );
    fireEvent(getByTestId("Picker"), "itemChange", { value: "value" });
    expect(handler).toBeCalledWith("value");
  });
});

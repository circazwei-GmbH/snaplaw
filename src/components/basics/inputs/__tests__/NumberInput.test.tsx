import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import NumberInput from "../NumberInput";

const TEST_NUMBER = 8;

describe("NumberInput", () => {
  it("should call onChange prop", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <NumberInput style={{}} onChange={handler} />
    );
    fireEvent.changeText(getByTestId("numeric.input"), TEST_NUMBER);
    expect(handler).toBeCalledWith(TEST_NUMBER);
  });
});

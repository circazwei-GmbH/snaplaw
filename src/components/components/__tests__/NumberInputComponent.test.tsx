import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import NumberInputComponent from "../NumberInputComponent";

const TEST_ERROR_MESSAGE = "error-test";

describe("NumberInputComponent", () => {
  it("Should call onCange prop", () => {
    const handler = jest.fn();
    const { getAllByTestId } = render(
      <NumberInputComponent
        onChange={handler}
        errorMessage={TEST_ERROR_MESSAGE}
      />
    );
    getAllByTestId("numeric.input").forEach((input, index) => {
      fireEvent.changeText(input, index);
    });
    expect(handler).toBeCalledTimes(4);
    expect(handler).toBeCalledWith("0123");
  });
});

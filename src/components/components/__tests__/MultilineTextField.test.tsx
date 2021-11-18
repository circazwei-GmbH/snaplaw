import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import MultilineTextField from "../MultilineTextField";

describe("MultilineTextField", () => {
  it("Should set styles", () => {
    const { getByTestId } = render(
      <MultilineTextField
        placeholder="placeholder"
        onChangeFunction={jest.fn()}
        checked
      />
    );
    expect(getByTestId("placeholder").props.style[1]).toBeNull();
    expect(getByTestId("placeholder").props.style[4]).not.toBeNull();
    
    fireEvent(getByTestId("placeholder"), "focus");
    expect(getByTestId("placeholder").props.style[1]).not.toBeNull();
    fireEvent(getByTestId("placeholder"), "blur");
  });
});

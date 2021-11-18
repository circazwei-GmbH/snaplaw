import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import DropdownInput from "../DropdownInput";

describe("DropdownInput", () => {
  it("Should open modal", () => {
    const { getByTestId } = render(
      <DropdownInput
        placeholder="placeholder"
        data={[]}
        onChangeFunction={jest.fn}
      />
    );

    expect(getByTestId("Search.placeholder").props.visible).toBeFalsy();
    fireEvent.press(getByTestId("DropdownInput.placeholder"));
    expect(getByTestId("Search.placeholder").props.visible).toBeTruthy();
    fireEvent.press(getByTestId("ModalBackScreen"));
    expect(getByTestId("Search.placeholder").props.visible).toBeFalsy();
  });
});

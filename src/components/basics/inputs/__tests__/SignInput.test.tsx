import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import SignInput from "../SignInput";
import { buildMediaSource } from "../../../../utils/helpers";

const TEST_IMAGE = "test_uri";

describe("SignInput", () => {
  it("Should dispaly image", () => {
    const { getByTestId } = render(
      <SignInput signUri={TEST_IMAGE} signHandler={jest.fn()} />
    );
    expect(getByTestId("SignImageID")).toBeTruthy();
    expect(getByTestId("SignImageID").props.source).toEqual(
      buildMediaSource(TEST_IMAGE)
    );
  });
  it("Should call handler", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <SignInput signUri={TEST_IMAGE} signHandler={handler} />
    );
    fireEvent.press(getByTestId("SignInputPressID"));
    expect(handler).toBeCalled();
  });
});

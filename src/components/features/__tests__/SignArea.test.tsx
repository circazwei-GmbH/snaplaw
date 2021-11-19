import { Signature } from "@scale-at/expo-pixi";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import SignArea from "../SignArea";

const signInstance = new Signature({ ref: jest.fn() });
signInstance.undo = jest.fn();

describe("UploadAvatar", () => {
  it("Should display user avatar and menu", () => {
    const handler = jest.fn();
    const { getByText, getByTestId } = render(
      <SignArea refSetter={jest.fn} signInstance={signInstance} onChange={handler} />
    );
    fireEvent.press(getByText("sign_form.buttons.clear"));
    expect(handler).toBeCalled();
    fireEvent.press(getByTestId("UndoButton"));
    expect(signInstance.undo).toBeCalled()
  });
});

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import InviteInput from "../InviteInput";

const TEST_NAME = "name-test";

describe("InviteInput", () => {
  it("Should be dispay name", () => {
    const { getByText } = render(
      <InviteInput invitedName={TEST_NAME} inviteHandler={jest.fn()} />
    );
    expect(getByText(TEST_NAME)).toBeTruthy();
  });
  it("Should call handler", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <InviteInput invitedName={TEST_NAME} inviteHandler={handler} />
    );
    fireEvent.press(getByTestId("InvitePressabelAreaID"));
    expect(handler).toBeCalled();
  });
});

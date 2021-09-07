import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import TextSwitch, { TEXT_SWITCH_POSITION } from "../TextSwitch";

const LEFT = "left";
const RIGHT = "right";

describe("TextSwitch", () => {
  it("Should display left and right element", () => {
    const { getByText } = render(
      <TextSwitch
        left={LEFT}
        right={RIGHT}
        currentPosition={TEXT_SWITCH_POSITION.LEFT}
        onChange={jest.fn()}
      />
    );
    expect(getByText(LEFT)).toBeTruthy();
    expect(getByText(RIGHT)).toBeTruthy();
  });
  it("Should call handler on change", () => {
    const handler = jest.fn();
    const { getByText } = render(
      <TextSwitch
        left={LEFT}
        right={RIGHT}
        currentPosition={TEXT_SWITCH_POSITION.LEFT}
        onChange={handler}
      />
    );
    fireEvent.press(getByText(RIGHT));
    expect(handler).toBeCalledWith(TEXT_SWITCH_POSITION.RIGHT);
    fireEvent.press(getByText(LEFT));
    expect(handler).toBeCalledWith(TEXT_SWITCH_POSITION.LEFT);
  });
});

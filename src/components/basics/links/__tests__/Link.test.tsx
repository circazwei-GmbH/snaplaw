import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Link from "../link";

describe("Link", () => {
  it("Link view", () => {
    const { getByText } = render(<Link text="TestLink" />);
    expect(getByText("TestLink")).toBeTruthy();
  });
  it("Link click", async () => {
    const handler = jest.fn();
    const { findByText } = render(<Link text="TestLink" onPress={handler} />);
    fireEvent.press(await findByText("TestLink"));
    expect(handler).toBeCalled();
  });
});

import React from "react";
import { render } from "@testing-library/react-native";
import Select from "../Select";

const ITEMS = [
  {
    value: "Test",
    label: "Test-label",
  },
];

describe("Select", () => {
  it("Select should display", () => {
    const handler = jest.fn();
    const { toJSON } = render(
      <Select items={ITEMS} selectedValue={ITEMS[0]} onValueChange={handler} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

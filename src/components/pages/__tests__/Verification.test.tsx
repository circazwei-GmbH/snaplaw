import React from "react";
import { render } from "@testing-library/react-native";
import Verification from "../auth/Verification";
import { Provider } from "react-redux";
import store from "../../../store/index";

describe("Verification", () => {
  it("Should desplay screen", () => {
    const route = {
      params: {
        email: "Test@email.com",
      },
    };
    const { getByA11yLabel, getByText } = render(
      <Provider store={store}>
        <Verification route={route} />
      </Provider>
    );
    expect(getByA11yLabel("asset-image")).toBeTruthy();
    expect(getByText("verification.description")).toBeTruthy();
    expect(getByText("verification.resend.link")).toBeTruthy();
    expect(getByText("verification.submit")).toBeTruthy();
  });
});

import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Invite from "../Invite";
import store from "../../../../store/index";

describe("Invite", () => {
  it("Should display avatar and title component", () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Invite route={{ params: { contractId: "testContract" } }} />
      </Provider>
    );

    expect(getByTestId("AvatarImage")).toBeTruthy();
    expect(getByText("invite_page.invitation")).toBeTruthy();
  });
});

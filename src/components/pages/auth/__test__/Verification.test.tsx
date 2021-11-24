import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { requestVerificationResend } from "../../../../store/modules/auth/action-creators";
import { verificationFailed } from "../../../../store/modules/auth/slice";
import Verification from "../Verification";

const actions = jest.fn();

const initialState = {
  auth: {
    verification: {},
  },
};

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return state;
};

const store = createStore(reduser);

describe("Verification", () => {
  it("Should dispatch action", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Verification
          route={{
            params: {
              email: "email",
              to: "to",
            },
          }}
        />
      </Provider>
    );
    fireEvent.press(getByText("verification.resend.link"));
    expect(actions).toBeCalledWith(requestVerificationResend("email"));

    fireEvent.press(getByText("verification.submit"));
    expect(actions).toBeCalledWith(verificationFailed(""));
  });
});

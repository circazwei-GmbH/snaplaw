import React from "react";
import { render } from "@testing-library/react-native";
import ContractTypeCard from "../ContractTypeCard";
import { Provider } from "react-redux";
import { LANGUAGE_ENGLISH, LANGUAGE_GERMANY } from "../../../store/modules/profile/constants";
import { createStore } from "redux";

const CARD_TEXT = "card-text";

const initialState = {
  profile: {
    language: LANGUAGE_GERMANY
  }
};

const reduser = (state = initialState, action: unknown) => {
  return initialState;
};

const store = createStore(reduser);

describe("ContractTypeCard", () => {
  it("Text should be displayed", () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <ContractTypeCard
          image={require("../../../../assets/purchase_contract.png")}
          title={CARD_TEXT}
        />
      </Provider>
    );
    expect(getByText(CARD_TEXT)).toBeTruthy();
    expect(getByText(CARD_TEXT).props.style[1]).toBeNull();
    expect(getByTestId(`Image.${CARD_TEXT}`)).toBeTruthy();
  });
  it("Should set styles", () => {
    initialState.profile.language = LANGUAGE_ENGLISH;
    const { getByText } = render(
      <Provider store={store}>
        <ContractTypeCard
          image={require("../../../../assets/purchase_contract.png")}
          title={CARD_TEXT}
        />
      </Provider>
    );
    expect(getByText(CARD_TEXT).props.style[1]).not.toBeNull();
  });
});

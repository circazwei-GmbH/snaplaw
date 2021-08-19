import React from "react";
import { render } from "@testing-library/react-native";
import ContractTypeCard from "../ContractTypeCard";
import { Provider } from "react-redux";
import store from "../../../store/index";

const CARD_TEXT = "card-text";

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
    expect(getByTestId(`Image.${CARD_TEXT}`)).toBeTruthy();
  });
});

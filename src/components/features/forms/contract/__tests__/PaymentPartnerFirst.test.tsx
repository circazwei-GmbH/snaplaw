import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";
import {
  CURRENCY,
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
} from "../../../../../store/modules/contract/payment";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import PaymentPartnerFirst from "../PaymentPartnerFirst";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.WORK,
      meRole: CONTRACT_ROLE.PARTNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.PAYMENT,
          data: {
            [PAYMENT_FIELDS.CURRENCY]: CURRENCY.EUR,
          },
        },
      ],
    },
    contractErrors: undefined,
  },
};

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("PaymentPartnerFirst", () => {
  it("Should dispaly form", () => {
    const { getByText, queryByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentPartnerFirst />
      </Provider>
    );

    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.CURRENCY,
        value: CURRENCY.EUR,
      })
    );

    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.product_price`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.paypal`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
      )
    ).toBeTruthy();
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.name`
      )
    ).toBeFalsy();
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.card`
      )
    ).toBeFalsy();
  });
  it("Should additional fields", () => {
    //@ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.PAYMENT_METHOD
    ] = PAYMENT_METHODS.TRANSFER;
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentPartnerFirst />
      </Provider>
    );

    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.name`
      )
    ).toBeTruthy();
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.card`
      )
    ).toBeTruthy();
  });
  it("Should additional fields", () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Provider store={store}>
        <PaymentPartnerFirst />
      </Provider>
    );

    const value = "value";

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.name`
      ),
      value
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.CARD_NAME,
        value,
      })
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.card`
      ),
      value
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.CARD_NUMBER,
        value,
      })
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`
      ),
      value
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.COST,
        value,
      })
    );

    fireEvent(getByTestId("Picker"), "itemChange", { value });
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.CURRENCY,
        value,
      })
    );

    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_METHOD,
        value: PAYMENT_METHODS.CASH,
      })
    );

    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.paypal`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_METHOD,
        value: PAYMENT_METHODS.PAYPAL,
      })
    );

    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_METHOD,
        value: PAYMENT_METHODS.TRANSFER,
      })
    );
  });
  it("Should additional fields", () => {
    //@ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.PAYMENT]: {
        [PAYMENT_FIELDS.COST]: "some error",
      },
    };

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentPartnerFirst />
      </Provider>
    );

    const value = "value";

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`
      ),
      value
    );
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.WORK, CONTRACT_SCREEN_TYPES.PAYMENT)
    );
  });
  it("Should not render on undefined contract type", () => {
    // @ts-ignore
    initialState.contract.currentContract = undefined;
    const { queryByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentPartnerFirst />
      </Provider>
    );
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`
      )
    ).toBeFalsy();
  });
});

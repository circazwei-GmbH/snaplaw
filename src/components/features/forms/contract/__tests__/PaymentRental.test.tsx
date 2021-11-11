import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Payment from "../Payment";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import {
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
} from "../../../../../store/modules/contract/types";
import { CURRENCY } from "../../../../../store/modules/contract/payment";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";
import PaymentRental from "../PaymentRental";
import { getDateWithoutTime } from "../../../../../store/modules/contract/helper";
import { PRICE_ADJUSTMENT_FIELDS } from "../../../../../store/modules/contract/price-adjustment-data";

const INITIAL_STATE = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.PAYMENT,
          data: {},
        },
      ],
    },
    contractErrors: {
      [CONTRACT_SCREEN_TYPES.PAYMENT]: {
        [PAYMENT_FIELDS.PAYMENT_METHOD]: "",
      },
    },
  },
};

const actions = jest.fn();
const initStore = (initialState: Record<string, unknown>) => {
  const reduser = (state = initialState, action: unknown) => {
    actions(action);
    return initialState;
  };
  return createStore(reduser);
};

describe("PaymentRental", () => {
  it("Should dispaly form", () => {
    const store = initStore(INITIAL_STATE);
    const { getByText, queryByText, queryByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentRental />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.bank_guarantee`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.other`
      )
    ).toBeTruthy();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.payment_date`
      )
    ).not.toBeTruthy();
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.other_description`
      )
    ).not.toBeTruthy();
  });
  it("Should dispaly additional fields when other checked", () => {
    const initialState = INITIAL_STATE;
    //@ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.PAYMENT_METHOD
    ] = PAYMENT_METHODS.OTHER;
    const store = initStore(initialState);
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentRental />
      </Provider>
    );
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.other_description`
      )
    ).toBeTruthy();

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.other_description`
      ),
      "text"
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.OTHER_DESCRIPTION,
        value: "text",
      })
    );
  });
  it("Should dispaly additional fields when bank guarantee checked and dispatch action on change", () => {
    const initialState = INITIAL_STATE;
    //@ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.PAYMENT_METHOD
    ] = PAYMENT_METHODS.BANK_GUARANTEE;
    const store = initStore(initialState);
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <PaymentRental />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.payment_date`
      )
    ).toBeTruthy();

    const date = getDateWithoutTime(new Date());
    fireEvent.press(
      getByTestId(`DataPickerPressabelAreaID${PAYMENT_FIELDS.PAYMENT_DATE}`)
    );
    fireEvent.press(getByTestId(`ConfirmDate${PAYMENT_FIELDS.PAYMENT_DATE}`));
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_DATE,
        value: `${date}`,
      })
    );
  });
  it("Should dispath action on changed", () => {
    actions.mockClear();
    const initialState = INITIAL_STATE;
    //@ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.PAYMENT_METHOD
    ] = PAYMENT_METHODS.TRANSFER;
    const store = initStore(initialState);
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentRental />
      </Provider>
    );

    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.CURRENCY,
        value: CURRENCY.EUR,
      })
    );
    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`
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
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.bank_guarantee`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_METHOD,
        value: PAYMENT_METHODS.BANK_GUARANTEE,
      })
    );

    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_METHOD,
        value: PAYMENT_METHODS.TRANSFER,
      })
    );

    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.other`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_METHOD,
        value: PAYMENT_METHODS.OTHER,
      })
    );
  });
  it("Should dispatch validation", () => {
    const initialState = INITIAL_STATE;
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.PAYMENT]: {
        [PAYMENT_FIELDS.PAYMENT_METHOD]: "some error",
      },
    };
    const store = initStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <PaymentRental />
      </Provider>
    );
    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
      )
    );
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.RENTAL, CONTRACT_SCREEN_TYPES.PAYMENT)
    );
  });
  it("Should show owner warning", () => {
    const initialState = INITIAL_STATE;
    // @ts-ignore
    initialState.contract.currentContract.screens[1] = {
      type: CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT,
      data: { [PRICE_ADJUSTMENT_FIELDS.DEPOSIT]: true },
    };
    // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.SELLER_PAYMENT_METHOD
    ] = PAYMENT_METHODS.TRANSFER;
    const store = initStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <PaymentRental />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.owner_warning`
      )
    ).toBeTruthy();
  });
  it("Should show partner text", () => {
    const initialState = INITIAL_STATE;
    // @ts-ignore
    initialState.contract.currentContract.meRole = CONTRACT_ROLE.PARTNER;
    const store = initStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <PaymentRental />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.partner_text`
      )
    ).toBeTruthy();
  });
  it("Should show partner warning", () => {
    const initialState = INITIAL_STATE;
    // @ts-ignore
    initialState.contract.currentContract.meRole = CONTRACT_ROLE.PARTNER;
    // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.PAYMENT_METHOD
    ] = PAYMENT_METHODS.CASH;
    // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.SELLER_PAYMENT_METHOD
    ] = PAYMENT_METHODS.TRANSFER;
    const store = initStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <PaymentRental />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.partner_warning`
      )
    ).toBeTruthy();
  });
  it("Should not render on undefined contract type", () => {
    const initialState = INITIAL_STATE;
    // @ts-ignore
    initialState.contract.currentContract = undefined;
    const store = initStore(initialState);
    const { queryByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentRental />
      </Provider>
    );
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`
      )
    ).not.toBeTruthy();
  });
});

import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
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
import { getDateWithoutTime } from "../../../../../store/modules/contract/helper";
import { PRICE_ADJUSTMENT_FIELDS } from "../../../../../store/modules/contract/price-adjustment-data";
import PaymentCar from "../PaymentCar";

const date = getDateWithoutTime(new Date());

const INITIAL_STATE = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.CAR,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.PAYMENT,
          data: {
            [PAYMENT_FIELDS.CURRENCY]: CURRENCY.EUR,
          },
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

describe("PaymentCar", () => {
  it("Should dispaly form", () => {
    const store = initStore(INITIAL_STATE);
    const { getByText, queryByText, queryByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentCar />
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
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.payment_method`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash_advance`
      )
    ).toBeTruthy();

    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.payment_date`
      )
    ).toBeFalsy();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.due_date`
      )
    ).toBeFalsy();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.advance_date`
      )
    ).toBeFalsy();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.left_sum`
      )
    ).toBeFalsy();
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.advance_cost`
      )
    ).toBeFalsy();
  });
  it("Should dispaly additional fields when cash checked and dispatch action on change", () => {
    const initialState = INITIAL_STATE;
    //@ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.PAYMENT_METHOD
    ] = PAYMENT_METHODS.CASH;
    const store = initStore(initialState);
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <PaymentCar />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.payment_date`
      )
    ).toBeTruthy();

    fireEvent.press(getByTestId(`ConfirmDate${PAYMENT_FIELDS.PAYMENT_DATE}`));
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_DATE,
        value: `${date}`,
      })
    );
  });
  it("Should dispaly additional fields when transfer checked and dispatch action on change", () => {
    const initialState = INITIAL_STATE;
    //@ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.PAYMENT_METHOD
    ] = PAYMENT_METHODS.TRANSFER;
    const store = initStore(initialState);
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <PaymentCar />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.due_date`
      )
    ).toBeTruthy();

    fireEvent.press(getByTestId(`ConfirmDate${PAYMENT_FIELDS.DUE_DATE}`));
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.DUE_DATE,
        value: `${date}`,
      })
    );
  });
  it("Should dispaly additional fields when cash advance checked and dispatch action on change", () => {
    const initialState = INITIAL_STATE;
    //@ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PAYMENT_FIELDS.PAYMENT_METHOD
    ] = PAYMENT_METHODS.CASH_ADVANCE;
    const store = initStore(initialState);
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentCar />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.advance_date`
      )
    ).toBeTruthy();

    fireEvent.press(getByTestId(`ConfirmDate${PAYMENT_FIELDS.FIRST_DATE}`));
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.FIRST_DATE,
        value: `${date}`,
      })
    );

    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.advance_cost`
      )
    ).toBeTruthy();

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.advance_cost`
      ),
      `${date}`
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.ADVANCE_COST,
        value: `${date}`,
      })
    );

    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.left_sum`
      )
    ).toBeTruthy();

    fireEvent.press(getByTestId(`ConfirmDate${PAYMENT_FIELDS.SECOND_DATE}`));
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.SECOND_DATE,
        value: `${date}`,
      })
    );
  });
  it("Should dispath action on changed", () => {
    actions.mockClear();
    const initialState = INITIAL_STATE;
    const store = initStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <PaymentCar />
      </Provider>
    );

    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`
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
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash_advance`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.PAYMENT_METHOD,
        value: PAYMENT_METHODS.CASH_ADVANCE,
      })
    );

    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
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
        <PaymentCar />
      </Provider>
    );
    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
      )
    );
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.CAR, CONTRACT_SCREEN_TYPES.PAYMENT)
    );
  });
  it("Should not render on undefined contract type", () => {
    const initialState = INITIAL_STATE;
    // @ts-ignore
    initialState.contract.currentContract = undefined;
    const store = initStore(initialState);
    const { queryByPlaceholderText } = render(
      <Provider store={store}>
        <PaymentCar />
      </Provider>
    );
    expect(
      queryByPlaceholderText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`
      )
    ).toBeFalsy();
  });
});

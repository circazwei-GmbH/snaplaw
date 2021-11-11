import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import { CONTRACT_ROLE } from "../../../../../store/modules/contract/contract-roles";
import PriceAdjustment from "../PriceAdjustment";
import { PRICE_ADJUSTMENT_FIELDS } from "../../../../../store/modules/contract/price-adjustment-data";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";
import {
  CURRENCY,
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
} from "../../../../../store/modules/contract/payment";
import { getDateWithoutTime } from "../../../../../store/modules/contract/helper";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT,
          data: {
            [PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_CURRENCY]: CURRENCY.EUR,
          },
        },
      ],
      contractErrors: undefined,
    },
  },
};

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("PriceAdjustment", () => {
  it("Should dispaly form", () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <PriceAdjustment />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.fields.deposit`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.fields.graduatedLease`
      )
    ).toBeTruthy();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.graduatedLease.priceText`
      )
    ).toBeNull();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.graduatedLease.dateText`
      )
    ).toBeNull();
  });
  it("Should dispath on action on toggle switcher", () => {
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={store}>
        <PriceAdjustment />
      </Provider>
    );

    fireEvent(
      getByTestId(
        `Switch.contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.fields.deposit`
      ),
      "valueChange"
    );
    expect(actions.mock.calls[1][0]).toEqual(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT,
        fieldName: PRICE_ADJUSTMENT_FIELDS.DEPOSIT,
        value: true,
      })
    );

    fireEvent(
      getByTestId(
        `Switch.contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.fields.graduatedLease`
      ),
      "valueChange"
    );
    expect(actions.mock.calls[2][0]).toEqual(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT,
        fieldName: PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE,
        value: true,
      })
    );
  });
  it("Should dispath on action on change value", () => {
    // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE
    ] = true;
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={store}>
        <PriceAdjustment />
      </Provider>
    );

    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT,
        fieldName: PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_CURRENCY,
        value: CURRENCY.EUR,
      })
    );

    const date = getDateWithoutTime(new Date());
    fireEvent.press(
      getByTestId(
        `DataPickerPressabelAreaID${PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_DATE}`
      )
    );
    fireEvent.press(
      getByTestId(`ConfirmDate${PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_DATE}`)
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT,
        fieldName: PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_DATE,
        value: `${date}`,
      })
    );
  });
  it("Should dispaly additional fields", () => {
    // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE
    ] = true;
    const { getByText } = render(
      <Provider store={store}>
        <PriceAdjustment />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.graduatedLease.priceText`
      )
    ).toBeTruthy();

    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.graduatedLease.dateText`
      )
    ).toBeTruthy();
  });
  it("Should dispaly warning when bank guarantee selected", () => {
    // @ts-ignore
    initialState.contract.currentContract.screens[1] = {
      type: CONTRACT_SCREEN_TYPES.PAYMENT,
      data: {
        //@ts-ignore
        [PAYMENT_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS.BANK_GUARANTEE,
      },
    };
    const { getByText } = render(
      <Provider store={store}>
        <PriceAdjustment />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.warning`
      )
    ).toBeTruthy();
  });
  it("Should dispatch validator", () => {
    // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE
    ] = true;
    // @ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT]: {
        [PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_PRICE]: "some error",
      },
    };
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <PriceAdjustment />
      </Provider>
    );
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.graduatedLease.price`
      ),
      "test"
    );
    expect(actions).toBeCalledWith(
      validateScreen(
        CONTRACT_TYPES.RENTAL,
        CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT
      )
    );
  });
  it("useEffect without screen", () => {
    initialState.contract.currentContract.screens = [];
    const {} = render(
      <Provider store={store}>
        <PriceAdjustment />
      </Provider>
    );
  });
});

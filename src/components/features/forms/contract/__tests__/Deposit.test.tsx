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
import { validateScreen } from "../../../../../store/modules/contract/action-creators";
import { getDateWithoutTime } from "../../../../../store/modules/contract/helper";
import Deposit from "../Deposit";
import {
  DEPOSIT_FIELDS,
  DEPOSIT_TYPES,
} from "../../../../../store/modules/contract/deposit-data";
import { CURRENCY } from "../../../../../store/modules/contract/payment";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.DEPOSIT,
          data: {
            [DEPOSIT_FIELDS.CURRENCY]: CURRENCY.EUR,
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

describe("Deposit", () => {
  it("Should dispaly form", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Deposit />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.checkboxes.${DEPOSIT_TYPES.TWO_MONTH}`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.checkboxes.${DEPOSIT_TYPES.THREE_MONTH}`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.checkboxes.${DEPOSIT_TYPES.OTHER}`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.priceText`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.dateText`
      )
    ).toBeTruthy();
  });
  it("Should dispath on action on change", () => {
    actions.mockClear();
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <Deposit />
      </Provider>
    );

    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.checkboxes.${DEPOSIT_TYPES.TWO_MONTH}`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.DEPOSIT,
        fieldName: DEPOSIT_FIELDS.DEPOSIT,
        value: DEPOSIT_TYPES.TWO_MONTH,
      })
    );

    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.checkboxes.${DEPOSIT_TYPES.THREE_MONTH}`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.DEPOSIT,
        fieldName: DEPOSIT_FIELDS.DEPOSIT,
        value: DEPOSIT_TYPES.THREE_MONTH,
      })
    );

    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.checkboxes.${DEPOSIT_TYPES.OTHER}`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.DEPOSIT,
        fieldName: DEPOSIT_FIELDS.DEPOSIT,
        value: DEPOSIT_TYPES.OTHER,
      })
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.price`
      ),
      "test_string"
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.DEPOSIT,
        fieldName: DEPOSIT_FIELDS.COST,
        value: "test_string",
      })
    );

    const date = getDateWithoutTime(new Date());
    fireEvent.press(
      getByTestId(
        `DataPickerPressabelAreaID${DEPOSIT_FIELDS.DATE}`
      )
    );
    fireEvent.press(
      getByTestId(`ConfirmDate${DEPOSIT_FIELDS.DATE}`)
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.DEPOSIT,
        fieldName: DEPOSIT_FIELDS.DATE,
        value: `${date}`,
      })
    );

    fireEvent(getByTestId("Picker"), "itemChange", { value: "value" });
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.DEPOSIT,
        fieldName: DEPOSIT_FIELDS.CURRENCY,
        value: "value",
      })
    );
  });
  it("Should dispatch validator", () => {
    // @ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.DEPOSIT]: {
        [DEPOSIT_FIELDS.COST]: "some error",
      },
    };
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Deposit />
      </Provider>
    );
    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.price`
      ),
      "test_string"
    );
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.RENTAL, CONTRACT_SCREEN_TYPES.DEPOSIT)
    );
  });
});

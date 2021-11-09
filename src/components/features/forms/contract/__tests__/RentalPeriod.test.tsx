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
import RentalPeriod from "../RentalPeriod";
import { RENTAL_PERIOD_FIELDS } from "../../../../../store/modules/contract/rental-period-data";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";
import { getDateWithoutTime } from "../../../../../store/modules/contract/helper";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.RENTAL_PERIOD,
          data: {},
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

describe("RentalPeriod", () => {
  it("Should dispaly form", () => {
    const { getByText } = render(
      <Provider store={store}>
        <RentalPeriod />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.switchers.${RENTAL_PERIOD_FIELDS.MIN_TERM}`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.switchers.${RENTAL_PERIOD_FIELDS.RENTING_LIMITED}`
      )
    ).toBeTruthy();
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.date`
      )
    ).toBeTruthy();
  });
  it("Should dispath on action on toggle switchers", () => {
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={store}>
        <RentalPeriod />
      </Provider>
    );

    fireEvent(
      getByTestId(
        `Switch.contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.switchers.${RENTAL_PERIOD_FIELDS.RENTING_LIMITED}`
      ),
      "valueChange"
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.RENTAL_PERIOD,
        fieldName: RENTAL_PERIOD_FIELDS.RENTING_LIMITED,
        value: true,
      })
    );

    fireEvent(
      getByTestId(
        `Switch.contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.switchers.${RENTAL_PERIOD_FIELDS.MIN_TERM}`
      ),
      "valueChange"
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.RENTAL_PERIOD,
        fieldName: RENTAL_PERIOD_FIELDS.MIN_TERM,
        value: true,
      })
    );
  });
  it("Should dispaly external fields", () => {
    // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      RENTAL_PERIOD_FIELDS.MIN_TERM
    ] = true;
    // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      RENTAL_PERIOD_FIELDS.RENTING_LIMITED
    ] = true;
    const { getAllByText } = render(
      <Provider store={store}>
        <RentalPeriod />
      </Provider>
    );

    expect(
      getAllByText(
        `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.date`
      )
    ).toHaveLength(3);
  });
  it("Should dispath on action on change date", () => {
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={store}>
        <RentalPeriod />
      </Provider>
    );

    const date = getDateWithoutTime(new Date());

    fireEvent.press(
      getByTestId(`DataPickerPressabelAreaID${RENTAL_PERIOD_FIELDS.START}`)
    );
    fireEvent.press(getByTestId(`ConfirmDate${RENTAL_PERIOD_FIELDS.START}`));
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.RENTAL_PERIOD,
        fieldName: RENTAL_PERIOD_FIELDS.START,
        value: `${date}`,
      })
    );

    fireEvent.press(
      getByTestId(
        `DataPickerPressabelAreaID${RENTAL_PERIOD_FIELDS.MIN_TERM_DATE}`
      )
    );
    fireEvent.press(
      getByTestId(`ConfirmDate${RENTAL_PERIOD_FIELDS.MIN_TERM_DATE}`)
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.RENTAL_PERIOD,
        fieldName: RENTAL_PERIOD_FIELDS.MIN_TERM_DATE,
        value: `${date}`,
      })
    );

    fireEvent.press(
      getByTestId(
        `DataPickerPressabelAreaID${RENTAL_PERIOD_FIELDS.RENTING_LIMITED_DATE}`
      )
    );
    fireEvent.press(
      getByTestId(`ConfirmDate${RENTAL_PERIOD_FIELDS.RENTING_LIMITED_DATE}`)
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.RENTAL_PERIOD,
        fieldName: RENTAL_PERIOD_FIELDS.RENTING_LIMITED_DATE,
        value: `${date}`,
      })
    );
  });
  it("Should dispatch validator", () => {
    initialState.contract = {
      ...initialState.contract,
      // @ts-ignore
      contractErrors: {
        [CONTRACT_SCREEN_TYPES.RENTAL_PERIOD]: {
          [RENTAL_PERIOD_FIELDS.START]: "some error",
        },
      },
    };
    const { getByTestId } = render(
      <Provider store={store}>
        <RentalPeriod />
      </Provider>
    );
    fireEvent.press(
      getByTestId(`DataPickerPressabelAreaID${RENTAL_PERIOD_FIELDS.START}`)
    );
    fireEvent.press(getByTestId(`ConfirmDate${RENTAL_PERIOD_FIELDS.START}`));
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.RENTAL, CONTRACT_SCREEN_TYPES.RENTAL_PERIOD)
    );
  });
  it("useEffect without screen", () => {
    initialState.contract.currentContract.screens = [];
    const {} = render(
      <Provider store={store}>
        <RentalPeriod />
      </Provider>
    );
  });
});

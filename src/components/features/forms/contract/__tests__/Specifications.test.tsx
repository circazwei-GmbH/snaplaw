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
import Specifications from "../Specifications";
import { SPECIFICATIONS_DATA_FIELDS } from "../../../../../store/modules/contract/specifications-data";
import { getDateWithoutTime } from "../../../../../store/modules/contract/helper";
import { validateScreen } from "../../../../../store/modules/contract/action-creators";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.CAR,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
          data: {},
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

describe("Specifications", () => {
  it("Should dispaly form", () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Specifications />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.inspection`
      )
    ).toBeTruthy();
    expect(
      queryByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.inspectionDate`
      )
    ).toBeNull();
  });
  it("Should dispath on action on toggle specification", () => {
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={store}>
        <Specifications />
      </Provider>
    );

    fireEvent(getByTestId(
      `Switch.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.inspection`
    ), "valueChange");
    expect(actions.mock.calls[0][0]).toEqual(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
        fieldName: SPECIFICATIONS_DATA_FIELDS.INSPECTION,
        value: true,
      })
    );

    fireEvent(getByTestId(
      `Switch.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.foreignMade`
    ), "valueChange");
    expect(actions.mock.calls[1][0]).toEqual(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
        fieldName: SPECIFICATIONS_DATA_FIELDS.FOREIGN_MADE,
        value: true,
      })
    );

    fireEvent(getByTestId(
      `Switch.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.commercial`
    ), "valueChange");
    expect(actions.mock.calls[2][0]).toEqual(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
        fieldName: SPECIFICATIONS_DATA_FIELDS.COMMERCIAL,
        value: true,
      })
    );

    fireEvent(getByTestId(
      `Switch.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.technicalWork`
    ), "valueChange");
    expect(actions.mock.calls[3][0]).toEqual(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
        fieldName: SPECIFICATIONS_DATA_FIELDS.TECHNICAL_WORK,
        value: true,
      })
    );

    fireEvent(getByTestId(
      `Switch.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.service`
    ), "valueChange");
    expect(actions.mock.calls[4][0]).toEqual(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
        fieldName: SPECIFICATIONS_DATA_FIELDS.SERVICE,
        value: true,
      })
    );

    fireEvent(getByTestId(
      `Switch.contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.deregistered`
    ), "valueChange");
    expect(actions.mock.calls[5][0]).toEqual(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
        fieldName: SPECIFICATIONS_DATA_FIELDS.DEREGISTERED,
        value: true,
      })
    );
  });
  it("Should dispaly external fields", () => {
      // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      SPECIFICATIONS_DATA_FIELDS.INSPECTION
    ] = true;
      // @ts-ignore
    initialState.contract.currentContract.screens[0].data[
      SPECIFICATIONS_DATA_FIELDS.DEREGISTERED
    ] = true;
    const { getByText } = render(
      <Provider store={store}>
        <Specifications />
      </Provider>
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.inspectionDate`
      )
    ).toBeTruthy();
    
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.deregisteredDate`
      )
    ).toBeTruthy();
  });
  it("Should dispatch action on change date", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Specifications />
      </Provider>
    );
    const date = getDateWithoutTime(new Date());

    fireEvent.press(getByTestId(`ConfirmDate${SPECIFICATIONS_DATA_FIELDS.INSPECTION_DATE}`))
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
        fieldName: SPECIFICATIONS_DATA_FIELDS.INSPECTION_DATE,
        value: `${date}`,
      })
    );

    fireEvent.press(getByTestId(`ConfirmDate${SPECIFICATIONS_DATA_FIELDS.DEREGISTERED_DATE}`))
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
        fieldName: SPECIFICATIONS_DATA_FIELDS.DEREGISTERED_DATE,
        value: `${date}`,
      })
    );
  });
  it("Should dispatch validate screen on change date", () => {
    //@ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.SPECIFICATIONS]: {
        [SPECIFICATIONS_DATA_FIELDS.INSPECTION_DATE]: "some error",
      }
    }
    const { getByTestId } = render(
      <Provider store={store}>
        <Specifications />
      </Provider>
    );

    fireEvent.press(getByTestId(`ConfirmDate${SPECIFICATIONS_DATA_FIELDS.INSPECTION_DATE}`))
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.CAR, CONTRACT_SCREEN_TYPES.SPECIFICATIONS)
    );
  });
  it("Should dispatch validate screen on change date", () => {
    //@ts-ignore
    initialState.contract.currentContract = null
    render(
      <Provider store={store}>
        <Specifications />
      </Provider>
    );
  });
});

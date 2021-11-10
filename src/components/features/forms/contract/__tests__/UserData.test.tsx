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
import {
  USER_DATA_FIELDS,
  USER_DATA_FIELDS_ARR,
} from "../../../../../store/modules/contract/user-data";
import { getDateWithoutTime } from "../../../../../store/modules/contract/helper";
import UserDataForm from "../UserDataForm";

const initialState = {
  profile: {
    user: undefined
  },
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.USER_DATA,
          data: {},
        },
      ],
    },
  },
};

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("UserData", () => {
  it("Should dispaly form", () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Provider store={store}>
        <UserDataForm />
      </Provider>
    );

    USER_DATA_FIELDS_ARR.forEach((field) => {
      if (field === USER_DATA_FIELDS.dateOfBirth) {
        expect(getByText(`edit_profile.placeholders.${field}`)).toBeTruthy();
      } else if (field === USER_DATA_FIELDS.email) {
        expect(
          getByTestId(`edit_profile.placeholders.${field}`)
        ).toBeTruthy();
      } else {
        expect(
          getByPlaceholderText(`edit_profile.placeholders.${field}`)
        ).toBeTruthy();
      }
    });
  });
  it("Should dispath action on change", () => {
    actions.mockClear();
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <UserDataForm />
      </Provider>
    );

    const test_string = "test";

    USER_DATA_FIELDS_ARR.forEach((field) => {
      if (field === USER_DATA_FIELDS.dateOfBirth) {
        const date = getDateWithoutTime(new Date());

        fireEvent.press(getByTestId(`DataPickerPressabelAreaID${field}`));
        fireEvent.press(getByTestId(`ConfirmDate${field}`));

        expect(actions).toBeCalledWith(
          setScreenData({
            screenType: CONTRACT_SCREEN_TYPES.USER_DATA,
            fieldName: field,
            value: `${date}`,
          })
        );
      } else if (field !== USER_DATA_FIELDS.email) {
        fireEvent.changeText(
          getByPlaceholderText(`edit_profile.placeholders.${field}`),
          test_string
        );
        expect(actions).toBeCalledWith(
          setScreenData({
            screenType: CONTRACT_SCREEN_TYPES.USER_DATA,
            fieldName: field,
            value: test_string,
          })
        );
      }
    });
  });
  it("Should dispatch validation", () => {
    // @ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.USER_DATA]: {
        [USER_DATA_FIELDS.name]: "some error",
      },
    };

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <UserDataForm />
      </Provider>
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `edit_profile.placeholders.${USER_DATA_FIELDS.name}`
      ),
      "test"
    );
    expect(actions).toBeCalledWith(
      validateScreen(
        CONTRACT_TYPES.RENTAL,
        CONTRACT_SCREEN_TYPES.USER_DATA
      )
    );
  });
  it("Should dispatch existing data", () => {
    initialState.contract.currentContract.screens = [];
    // @ts-ignore
    initialState.profile.user = {
      [USER_DATA_FIELDS.name]: "name"
    };

    const { } = render(
      <Provider store={store}>
        <UserDataForm />
      </Provider>
    );

    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.USER_DATA,
        fieldName: USER_DATA_FIELDS.name,
        value: "name",
      })
    );
  });
});

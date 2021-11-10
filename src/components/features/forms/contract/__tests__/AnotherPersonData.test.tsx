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
import AnotherPersonDataForm from "../AnotherPersonDataForm";
import {
  USER_DATA_FIELDS,
  USER_DATA_FIELDS_ARR,
} from "../../../../../store/modules/contract/user-data";
import { getDateWithoutTime } from "../../../../../store/modules/contract/helper";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.RENTAL,
      meRole: CONTRACT_ROLE.PARTNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.ANOTHER_PERSON_DATA,
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

describe("AnotherPersonData", () => {
  it("Should dispaly form", () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <AnotherPersonDataForm />
      </Provider>
    );

    USER_DATA_FIELDS_ARR.forEach((field) => {
      if (field === USER_DATA_FIELDS.dateOfBirth) {
        expect(getByText(`edit_profile.placeholders.${field}`)).toBeTruthy();
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
        <AnotherPersonDataForm />
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
            screenType: CONTRACT_SCREEN_TYPES.ANOTHER_PERSON_DATA,
            fieldName: field,
            value: `${date}`,
          })
        );
      } else {
        fireEvent.changeText(
          getByPlaceholderText(`edit_profile.placeholders.${field}`),
          test_string
        );
        expect(actions).toBeCalledWith(
          setScreenData({
            screenType: CONTRACT_SCREEN_TYPES.ANOTHER_PERSON_DATA,
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
      [CONTRACT_SCREEN_TYPES.ANOTHER_PERSON_DATA]: {
        [USER_DATA_FIELDS.name]: "some error",
      },
    };

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AnotherPersonDataForm />
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
        CONTRACT_SCREEN_TYPES.ANOTHER_PERSON_DATA
      )
    );
  });
});

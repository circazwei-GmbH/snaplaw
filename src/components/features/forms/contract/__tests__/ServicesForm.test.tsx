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
import { getDateWithoutTime } from "../../../../../store/modules/contract/helper";
import { setScreenData } from "../../../../../store/modules/contract/slice";
import { SERVICES_DATA_FIELDS } from "../../../../../store/modules/contract/work/services-data";
import ServicesForm, { initialService } from "../ServicesForm";

const initialState = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.WORK,
      meRole: CONTRACT_ROLE.OWNER,
      screens: [
        {
          type: CONTRACT_SCREEN_TYPES.SERVICES,
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

describe("ServicesForm", () => {
  it("Should dispatch setScreenData on init", () => {
    render(
      <Provider store={store}>
        <ServicesForm />
      </Provider>
    );

    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SERVICES,
        fieldName: SERVICES_DATA_FIELDS.SERVICES_DATA,
        value: [initialService],
      })
    );
  });
  it("Should dispaly form", () => {
    //@ts-ignore
    initialState.contract.currentContract.screens[0].data[
      SERVICES_DATA_FIELDS.SERVICES_DATA
    ] = [initialService];
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <ServicesForm />
      </Provider>
    );

    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SERVICES}.serviceTitle`
      )
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SERVICES}.dateTitle`
      )
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SERVICES}.button`
      )
    );
    expect(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SERVICES}.placeholders.date`
      )
    );
    expect(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SERVICES}.placeholders.service`
      )
    );
  });
  it("Should dispatch action on change", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <ServicesForm />
      </Provider>
    );

    fireEvent.changeText(
      getByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SERVICES}.placeholders.service`
      ),
      "value"
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SERVICES,
        fieldName: SERVICES_DATA_FIELDS.SERVICES_DATA,
        //@ts-ignore
        value: initialState.contract.currentContract.screens[0].data[
          SERVICES_DATA_FIELDS.SERVICES_DATA
          //@ts-ignore
        ].map((service, serviceIndex) =>
          //@ts-ignore
          0 === serviceIndex
            ? { ...service, [SERVICES_DATA_FIELDS.SERVICE_TITLE]: "value" }
            : service
        ),
      })
    );

    const date = getDateWithoutTime(new Date());
    fireEvent.press(
      getByTestId(`ConfirmDate${SERVICES_DATA_FIELDS.SERVICE_DATE}`)
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SERVICES,
        fieldName: SERVICES_DATA_FIELDS.SERVICES_DATA,
        //@ts-ignore
        value: initialState.contract.currentContract.screens[0].data[
          SERVICES_DATA_FIELDS.SERVICES_DATA
          //@ts-ignore
        ].map((service, serviceIndex) =>
          //@ts-ignore
          0 === serviceIndex
            ? { ...service, [SERVICES_DATA_FIELDS.SERVICE_DATE]: `${date}` }
            : service
        ),
      })
    );
  });
  it("Should add additional service", () => {
    //@ts-ignore
    initialState.contract.currentContract.screens[0].data[
      SERVICES_DATA_FIELDS.SERVICES_DATA
    ].push(initialService);
    const { getByText, getAllByPlaceholderText } = render(
      <Provider store={store}>
        <ServicesForm />
      </Provider>
    );

    fireEvent.press(
      getByText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SERVICES}.button`
      )
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SERVICES,
        fieldName: SERVICES_DATA_FIELDS.SERVICES_DATA,
        value: [
          //@ts-ignore
          ...initialState.contract.currentContract.screens[0].data[
            SERVICES_DATA_FIELDS.SERVICES_DATA
          ],
          initialService,
        ],
      })
    );

    fireEvent.changeText(
      getAllByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SERVICES}.placeholders.service`
      )[1],
      "value"
    );
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SERVICES,
        fieldName: SERVICES_DATA_FIELDS.SERVICES_DATA,
        //@ts-ignore
        value: initialState.contract.currentContract.screens[0].data[
          SERVICES_DATA_FIELDS.SERVICES_DATA
          //@ts-ignore
        ].map((service, serviceIndex) =>
          //@ts-ignore
          1 === serviceIndex
            ? { ...service, [SERVICES_DATA_FIELDS.SERVICE_TITLE]: "value" }
            : service
        ),
      })
    );
  });
  it("Should delete service", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ServicesForm />
      </Provider>
    );

    fireEvent.press(getByTestId(`Delete0`));
    const services = [
      //@ts-ignore
      ...initialState.contract.currentContract.screens[0].data[
        SERVICES_DATA_FIELDS.SERVICES_DATA
      ],
    ];
    services.splice(0, 1);

    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SERVICES,
        fieldName: SERVICES_DATA_FIELDS.SERVICES_DATA,
        value: [...services],
      })
    );
  });
  it("Should dispatch action on change", () => {
    //@ts-ignore
    initialState.contract.contractErrors = {
      [CONTRACT_SCREEN_TYPES.SERVICES]: {
        [SERVICES_DATA_FIELDS.SERVICES_DATA]: [
          { [SERVICES_DATA_FIELDS.SERVICE_TITLE]: "some error" },
        ],
      },
    };
    const { getAllByPlaceholderText } = render(
      <Provider store={store}>
        <ServicesForm />
      </Provider>
    );

    fireEvent.changeText(
      getAllByPlaceholderText(
        `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SERVICES}.placeholders.service`
      )[0],
      "value"
    );
    expect(actions).toBeCalledWith(
      validateScreen(CONTRACT_TYPES.WORK, CONTRACT_SCREEN_TYPES.SERVICES)
    );
  });
});

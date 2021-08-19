import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Contract from "../Contract";
import { createStore } from "@reduxjs/toolkit";
import { CONTRACT_TYPES } from "../../../../store/modules/contract/constants";
import { useNavigation } from "@react-navigation/native";
import { HOME_ROUTER } from "../../../../router/HomeRouterType";

jest.mock("../../../../store/modules/contract/contract-screens-types", () => {
  const {
    CONTRACT_TYPES,
  } = require("../../../../store/modules/contract/constants");
  const { View } = require("react-native");
  const Component = () => <View testID="FormComponent" />;
  return {
    contractScreensConfig: {
      [CONTRACT_TYPES.PURCHASE]: [
        {
          component: Component,
          title: "test-title",
        },
        {
          component: Component,
          title: "test-title-second",
        },
      ],
    },
  };
});

jest.mock("@react-navigation/native", () => {
  const navigation = {
    push: jest.fn(),
    pop: jest.fn(),
  };
  return {
    useNavigation: () => navigation,
  };
});

const PROPS = {
  route: {
    params: {
      screenCount: 0,
    },
  },
};

type InitialStateType = {
  contract: {
    currentContract: Record<"type", CONTRACT_TYPES> | undefined;
  };
};

const initialState: InitialStateType = {
  contract: {
    currentContract: {
      type: CONTRACT_TYPES.PURCHASE,
    },
  },
};

const actions = jest.fn();
const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

describe("Contract", () => {
  it("Should display form component", () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Contract route={PROPS.route} />
      </Provider>
    );

    expect(
      getByText(`contracts.${CONTRACT_TYPES.PURCHASE}.title`)
    ).toBeTruthy();
    expect(getByText("test-title")).toBeTruthy();
    expect(getByTestId("FormComponent")).toBeTruthy();
  });
  it("Should call navigation on navigate next", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Contract route={PROPS.route} />
      </Provider>
    );

    fireEvent.press(getByText("contracts.buttons.next"));
    expect(useNavigation().push).toBeCalledWith(HOME_ROUTER.CONTRACT, {
      screenCount: 1,
    });
  });
  it("Should call navigation on navigate back", () => {
    PROPS.route.params.screenCount = 1;
    const { getByText } = render(
      <Provider store={store}>
        <Contract route={PROPS.route} />
      </Provider>
    );

    fireEvent.press(getByText("contracts.buttons.back"));
    expect(useNavigation().pop).toBeCalled();
  });
  it("Should no render on undefined type", () => {
    initialState.contract.currentContract = undefined;
    const { queryByText } = render(
      <Provider store={store}>
        <Contract route={PROPS.route} />
      </Provider>
    );

    expect(queryByText("contracts.buttons.back")).not.toBeTruthy();
  });
});

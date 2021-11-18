import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MEDIA_TYPE } from "../../../services/media";
import { CONTRACT_SCREEN_TYPES } from "../../../store/modules/contract/constants";
import { setScreenData } from "../../../store/modules/contract/slice";
import MultilineWithPhotos from "../MultilineWithPhotos";

const actions = jest.fn();

const reduser = (state = {}, action: unknown) => {
  actions(action);
  return state;
};

const store = createStore(reduser);

describe("MultilineWithPhotos", () => {
  it("Should dispatch action on remove photo", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MultilineWithPhotos
          text="text"
          placeholder="placeholder"
          iconText="iconText"
          photosFieldName="photosFieldName"
          photos={[
            {
              uri: "uri",
              type: MEDIA_TYPE.IMAGE,
            },
          ]}
          onChangeFunction={jest.fn}
          screenType={CONTRACT_SCREEN_TYPES.PAYMENT}
        />
      </Provider>
    );
    expect(getByTestId("MultilineTextField").props.style).toBeNull();

    fireEvent.press(getByTestId("IamgeDeleteIcon"));
    expect(actions).toBeCalledWith(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: "photosFieldName",
        value: [],
      })
    );
  });
  it("Should set styles", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MultilineWithPhotos
          text="text"
          placeholder="placeholder"
          iconText="iconText"
          photosFieldName="photosFieldName"
          photos={[]}
          onChangeFunction={jest.fn}
          isDirectionReverse
        />
      </Provider>
    );

    expect(getByTestId("MultilineTextField").props.style).not.toBeNull();
  });
  it("Should open modal", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MultilineWithPhotos
          text="text"
          placeholder="placeholder"
          iconText="iconText"
          photosFieldName="photosFieldName"
          photos={[]}
          onChangeFunction={jest.fn}
          isDirectionReverse
        />
      </Provider>
    );

    expect(getByTestId("Menu").props.visible).toBeFalsy();
    fireEvent.press(getByTestId("iconText"));
    expect(getByTestId("Menu").props.visible).toBeTruthy();
    fireEvent.press(getByText("menu.cancel"));
    expect(getByTestId("Menu").props.visible).toBeFalsy();
  });
});

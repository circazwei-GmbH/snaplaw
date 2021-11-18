import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import UserAvatar from "../UserAvatar";
import { createStore } from "@reduxjs/toolkit";
import { buildMediaSource } from "../../../utils/helpers";
import { MEDIA_TYPE } from "../../../services/media";

const initialState = {
  profile: {
    avatarLoading: true,
  },
};
const TEST_URI = "test_url";
const url = { uri: TEST_URI, type: MEDIA_TYPE.IMAGE }

const actions = jest.fn();

const reduser = (state = initialState, action: any) => {
  actions(action);
  return initialState;
};

const customStore = createStore(reduser);

describe("UserAvatar", () => {
  it("Should display loading", () => {
    const { getByTestId } = render(
      <Provider store={customStore}>
        <UserAvatar sizeSmall />
      </Provider>
    );

    expect(getByTestId("AvatarLoadingActivityIndicator")).toBeTruthy();
  });
  it("Should not be displied loading", () => {
    initialState.profile.avatarLoading = false;
    const { queryByTestId } = render(
      <Provider store={customStore}>
        <UserAvatar sizeSmall />
      </Provider>
    );

    expect(queryByTestId("AvatarLoadingActivityIndicator")).not.toBeTruthy();
  });
  it("Should display loading by load src", () => {
    initialState.profile.avatarLoading = false;
    const { queryByTestId } = render(
      <Provider store={customStore}>
        <UserAvatar sizeSmall />
      </Provider>
    );
    expect(queryByTestId("AvatarLoadingActivityIndicator")).not.toBeTruthy();
    fireEvent(queryByTestId("AvatarImage"), "onLoadStart");

    expect(queryByTestId("AvatarLoadingActivityIndicator")).toBeTruthy();
    fireEvent(queryByTestId("AvatarImage"), "onLoad");
    expect(queryByTestId("AvatarLoadingActivityIndicator")).not.toBeTruthy();
    fireEvent(queryByTestId("AvatarImage"), "onLoadStart");

    fireEvent(queryByTestId("AvatarImage"), "onLoadEnd");
    expect(queryByTestId("AvatarLoadingActivityIndicator")).not.toBeTruthy();
  });
  it("Should use uri if it preset", () => {
    const { queryByTestId } = render(
      <Provider store={customStore}>
        <UserAvatar sizeSmall url={url} />
      </Provider>
    );

    expect(queryByTestId("AvatarImage").props.source).toEqual(
      buildMediaSource(TEST_URI)
    );
  });
  it("Should show big avatar", () => {
    const { getByTestId } = render(
      <Provider store={customStore}>
        <UserAvatar url={url} />
      </Provider>
    );

    expect(getByTestId("AvatarImageContainer").props.style[0].height).toEqual(300);
  });
});

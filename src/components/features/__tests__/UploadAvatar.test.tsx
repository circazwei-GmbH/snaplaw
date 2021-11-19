import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import UploadAvatar from "../UploadAvatar";
import { createStore } from "@reduxjs/toolkit";
import { cameraWay, libraryWay } from "../../../services/media/media-picker";
import {
  DELETE_AVATAR,
  updateAvatar,
} from "../../../store/modules/profile/action-creators";
import { uploadMedia } from "../../../store/modules/media/action-creators";
import { MEDIA_FOLDERS } from "../../../store/modules/media/constants";
import { PermissionNotGranted } from "../../../services/media/errors";
import { setAvatarLoading } from "../../../store/modules/profile/slice";
import { setMessage } from "../../../store/modules/main/slice";
import { MEDIA_TYPE } from "../../../services/media";

const initialState = {
  profile: {
    user: {
      avatar: {
        uri: "test/url"
      },
    },
  },
};
const actions = jest.fn();
const reduser = (state = initialState, action: any) => {
  actions(action);
  return initialState;
};

const customStore = createStore(reduser);

jest.mock("../../components/UserAvatar", () => {
  const React = require("react");
  return (props: any) =>
    React.createElement("Text", { ...props, testID: "testID" });
});

jest.mock("../../features/Modals/Menu", () => {
  const React = require("react");
  return (props: any) =>
    React.createElement("Text", { ...props, testID: "MenuTestID" });
});

jest.mock("../../../services/media/media-picker", () => ({
  cameraWay: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve("cameraurl"))),
  libraryWay: jest.fn(),
}));

libraryWay
  // @ts-ignore
  .mockImplementationOnce(() => new Promise((resolve) => resolve("libraryurl")))
  .mockImplementationOnce(
    () => new Promise((resolve, reject) => reject("test.message"))
  )
  .mockImplementationOnce(() => {
    throw new PermissionNotGranted("test.message");
  });

describe("UploadAvatar", () => {
  it("Should display user avatar and menu", () => {
    const { getByTestId } = render(
      <Provider store={customStore}>
        <UploadAvatar isChangable avatar={initialState.profile.user.avatar} />
      </Provider>
    );

    expect(getByTestId("testID")).toBeTruthy();
    expect(getByTestId("testID").props.url).toEqual(
      initialState.profile.user.avatar
    );
    expect(getByTestId("MenuTestID")).toBeTruthy();
    expect(getByTestId("MenuTestID").props.visible).not.toBeTruthy();
  });
  it("Should open menu", () => {
    const { getByTestId } = render(
      <Provider store={customStore}>
        <UploadAvatar isChangable />
      </Provider>
    );

    fireEvent.press(getByTestId("openMenuIcon"));
    expect(getByTestId("MenuTestID").props.visible).toBeTruthy();

    const buttonsTitles = [
      "upload_files.gallary",
      "upload_files.camera",
      "edit_profile.delete",
    ];

    getByTestId("MenuTestID").props.buttons.forEach(
      (button: any, index: number) => {
        expect(button.title).toEqual(buttonsTitles[index]);
      }
    );
  });
  it("Should dispatch event on delete", () => {
    const { getByTestId } = render(
      <Provider store={customStore}>
        <UploadAvatar isChangable />
      </Provider>
    );
    fireEvent.press(getByTestId("openMenuIcon"));
    act(() => {
      getByTestId("MenuTestID").props.buttons[2].handler();
    });
    expect(getByTestId("MenuTestID").props.visible).not.toBeTruthy();
    expect(actions).toBeCalledWith({
      type: DELETE_AVATAR,
      payload: undefined,
    });
  });
  it("Should dispatch camera option", async () => {
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={customStore}>
        <UploadAvatar isChangable />
      </Provider>
    );

    await act(async () => {
      await getByTestId("MenuTestID").props.buttons[1].handler();
    });
    expect(cameraWay).toBeCalled();
    expect(actions.mock.calls[0][0]).toEqual(
      uploadMedia(
        "cameraurl",
        MEDIA_FOLDERS.AVATAR,
        updateAvatar({ uri: "", type: MEDIA_TYPE.IMAGE })
      )
    );
    expect(actions).toBeCalledWith(setAvatarLoading(true));
  });
  it("Should dispatch library option", async () => {
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={customStore}>
        <UploadAvatar isChangable />
      </Provider>
    );

    await act(async () => {
      await getByTestId("MenuTestID").props.buttons[0].handler();
    });
    expect(libraryWay).toBeCalled();
    expect(actions.mock.calls[0][0]).toEqual(
      uploadMedia(
        "libraryurl",
        MEDIA_FOLDERS.AVATAR,
        updateAvatar({ uri: "", type: MEDIA_TYPE.IMAGE })
      )
    );
    expect(actions).toBeCalledWith(setAvatarLoading(true));
  });
  it("Should dispatch library option with some error", async () => {
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={customStore}>
        <UploadAvatar isChangable />
      </Provider>
    );

    await act(async () => {
      await getByTestId("MenuTestID").props.buttons[0].handler();
    });
    expect(libraryWay).toBeCalled();
    expect(actions).toBeCalledWith(setMessage("errors.abstract"));
  });
  it("Should dispatch library option with blocked permission", async () => {
    actions.mockClear();
    const { getByTestId } = render(
      <Provider store={customStore}>
        <UploadAvatar isChangable />
      </Provider>
    );

    await act(async () => {
      await getByTestId("MenuTestID").props.buttons[0].handler();
    });
    expect(libraryWay).toBeCalled();
    expect(actions).toBeCalledWith(setMessage("test.message"));
  });
  it("Should not show MaterialCommunityIcons", async () => {
    actions.mockClear();
    const { queryByTestId } = render(
      <Provider store={customStore}>
        <UploadAvatar />
      </Provider>
    );
    expect(queryByTestId("openMenuIcon")).toBeNull();
  });
});

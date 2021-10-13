import { Constants } from "react-native-unimodules";
import {init, PermissionNotGranted, removePushTokenFromApi, storeTokenToApi} from "../index";
import * as Notifications from "expo-notifications"
import httpClient from '../../api';

jest.mock("react-native-unimodules", () => ({
  Constants: {
    isDevice: true
  }
}))
jest.mock("expo-notifications", () => ({
  getPermissionsAsync: jest.fn().mockImplementationOnce(() => Promise.resolve({status: "declined"})).mockImplementationOnce(() => Promise.resolve({status: "granted"})),
  requestPermissionsAsync: jest.fn().mockImplementationOnce(() => Promise.resolve({status: "declined"})),
  getExpoPushTokenAsync: jest.fn().mockImplementationOnce(() => Promise.resolve({data: "token"})),
}))
jest.mock("expo-image-picker", () => ({
  PermissionStatus: {
    GRANTED: "granted"
  }
}))
jest.mock("../../api");

describe("Push Notifications", () => {
  it("Throw on run not in device", async () => {
    Constants.isDevice = false;
    await expect(init()).rejects.toBeInstanceOf(PermissionNotGranted)
  })
  it("Throw on run not in device", async () => {
    Constants.isDevice = true;
    await expect(init()).rejects.toBeInstanceOf(PermissionNotGranted)
    expect(Notifications.getPermissionsAsync).toBeCalled()
    expect(Notifications.requestPermissionsAsync).toBeCalled()
  })
  it("Should succesfuly get token", async () => {
    const token = await init()
    expect(token).toEqual("token")
    expect(Notifications.getExpoPushTokenAsync).toBeCalled()
  })
  it("Should call api for storing", () => {
    storeTokenToApi('hash');
    expect(httpClient.patch).toBeCalledWith("api/users/push-notification-token", {hash: "hash"})
  })
  it("Should remove toent from api", () => {
    removePushTokenFromApi();
    expect(httpClient.delete).toBeCalledWith("api/users/push-notification-token");
  })
})
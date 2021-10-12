import { Constants } from "react-native-unimodules";
import * as Notifications from "expo-notifications";
import { PermissionStatus } from "expo-image-picker";
import httpClient from "../api";

export class PermissionNotGranted extends Error {}


export const init = async () => {
  if (!Constants.isDevice) {
    throw new PermissionNotGranted();
  }
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== PermissionStatus.GRANTED) {
    const { status: statusAfterRequest } =
      await Notifications.requestPermissionsAsync();
    if (statusAfterRequest !== PermissionStatus.GRANTED) {
      throw new PermissionNotGranted();
    }
  }
  return (await Notifications.getExpoPushTokenAsync()).data;
};

export const storeTokenToApi = (hash: string) =>
  httpClient.patch("api/users/push-notification-token", { hash });

export const removePushTokenFromApi = () =>
  httpClient.delete("api/users/push-notification-token");

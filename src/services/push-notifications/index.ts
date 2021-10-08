import {Constants} from "react-native-unimodules";
import * as Notifications from "expo-notifications";
import {PermissionStatus} from "expo-image-picker";
import httpClient from "../api";

export class PermissionNotGranted extends Error {}

const registerReciver = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });
  Notifications.addNotificationReceivedListener(_n => {
    console.log('NOTIFICATION: ', _n)
  })
}

export const init = async () => {
  if (!Constants.isDevice) {
    throw new PermissionNotGranted();
  }
  const {status} = await Notifications.getPermissionsAsync();

  if (status !== PermissionStatus.GRANTED) {
    const {status: statusAfterRequest} = await Notifications.requestPermissionsAsync();
    if (statusAfterRequest !== PermissionStatus.GRANTED) {
      throw new PermissionNotGranted();
    }
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  registerReciver();
  return token;
}

export const storeTokenToApi = (hash: string) => httpClient.patch('api/users/set-push-notification-token', {hash});
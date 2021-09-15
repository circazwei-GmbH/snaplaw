import {
  RequestChangeNotificationStatusInterface,
  RequestChangeNotificationStatusAction,
} from "./types";

export const REQUEST_NOTIFICATIONS = "REQUEST_NOTIFICATIONS";
export const REQUEST_CHANGE_NOTIFICATION_STATUS =
  "REQUEST_CHANGE_NOTIFICATION_STATUS";

export const requestChangeNotificationStatus = (
  changeData: RequestChangeNotificationStatusInterface
): RequestChangeNotificationStatusAction => ({
  type: REQUEST_CHANGE_NOTIFICATION_STATUS,
  payload: changeData,
});

export const requestNotifications = () => ({
  type: REQUEST_NOTIFICATIONS,
});

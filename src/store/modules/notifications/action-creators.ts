import { BaseAction } from "../auth/types";
import {
  ChangeNotificationStatusInterface,
  ChangeNotificationStatusAction,
} from "./types";

export const REQUEST_NOTIFICATIONS = "REQUEST_NOTIFICATIONS";
export const CHANGE_NOTIFICATION_STATUS = "CHANGE_NOTIFICATION_STATUS";

export const changeNotificationStatus = (
  changeData: ChangeNotificationStatusInterface
): ChangeNotificationStatusAction => ({
  type: CHANGE_NOTIFICATION_STATUS,
  payload: changeData,
});

export const requestNotifications = () => ({
  type: REQUEST_NOTIFICATIONS,
});

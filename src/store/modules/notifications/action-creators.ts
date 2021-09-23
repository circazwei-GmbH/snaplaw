import {
  RequestChangeNotificationStatusInterface,
  RequestChangeNotificationStatusAction,
} from "./types";
import {BaseAction} from "../auth/types";

export const REQUEST_NOTIFICATIONS = "REQUEST_NOTIFICATIONS";
export const REQUEST_CHANGE_NOTIFICATION_STATUS =
  "REQUEST_CHANGE_NOTIFICATION_STATUS";

export interface RequestNotificationListAction extends BaseAction {
  payload: {
    isRefresh: boolean
  }
}

export const requestChangeNotificationStatus = (
  changeData: RequestChangeNotificationStatusInterface
): RequestChangeNotificationStatusAction => ({
  type: REQUEST_CHANGE_NOTIFICATION_STATUS,
  payload: changeData,
});

export const requestNotifications = (isRefresh: boolean = false): RequestNotificationListAction => ({
  type: REQUEST_NOTIFICATIONS,
  payload: {
    isRefresh
  }
});

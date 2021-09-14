import { BaseAction } from "../auth/types";

export const REQUEST_NOTIFICATIONS = "REQUEST_NOTIFICATIONS";

export interface RequestNotificationsAction extends BaseAction {
  payload: string;
}

export const requestNotifications = () => ({
  type: REQUEST_NOTIFICATIONS,
});

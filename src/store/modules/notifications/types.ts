import { BaseAction } from "../auth/types";

export interface NotificationInterface {
  _id: string;
  type: string;
  contractId: string;
  usernameFrom: string;
  createdAt: string;
  isNew: boolean;
  userId: string;
}

export interface NotificationListItemInterface {
  id: string;
  type: string;
  contractId: string;
  usernameFrom: string;
  createdAt: string;
  isNew: boolean;
  userId: string;
}

export interface ChangeNotificationStatusInterface {
  id: string;
  isNew: boolean;
}

export interface ChangeNotificationStatusAction extends BaseAction {
  payload: ChangeNotificationStatusInterface;
}

import { BaseAction } from "../auth/types";
import {NOTIFICATION_TYPE} from "../../../services/notification/notificationsConfig";

export interface NotificationInterface {
  _id: string;
  type: string;
  contractId: string;
  contractName: string;
  usernameFrom: string;
  createdAt: string;
  isNew: boolean;
  userId: string;
}

export interface NotificationListItemInterface {
  id: string;
  type: NOTIFICATION_TYPE;
  contractId: string;
  contractName: string;
  usernameFrom: string;
  createdAt: string;
  isNew: boolean;
  userId: string;
}

export interface RequestChangeNotificationStatusInterface {
  id: string;
}

export interface ChangeNotificationStatusAction extends BaseAction {
  payload: RequestChangeNotificationStatusInterface;
}

export interface RequestChangeNotificationStatusAction extends BaseAction {
  payload: RequestChangeNotificationStatusInterface;
}

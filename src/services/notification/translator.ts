import {
  NotificationInterface,
  NotificationListItemInterface,
} from "../../store/modules/notifications/types";

export const translateNotification = (
  notification: NotificationInterface
): NotificationListItemInterface => ({
  id: notification._id,
  type: notification.type,
  contractId: notification.contractId,
  contractName: notification.contractName
    ? ` “${notification.contractName}”`
    : "",
  usernameFrom: notification.usernameFrom,
  createdAt: notification.createdAt,
  isNew: notification.isNew,
  userId: notification.userId,
});

export const translateNotificationList = (
  list: NotificationInterface[]
): NotificationListItemInterface[] =>
  list.map((item) => translateNotification(item));

import { translateNotificationList } from "../translator";
import { NotificationInterface } from "../../../store/modules/notifications/types";
import { NOTIFICATION_TYPE } from "../notificationsConfig";

const TEST_NOTIFICATION: NotificationInterface = {
  _id: "testId",
  type: NOTIFICATION_TYPE.INVITE_USER_TO_CONTRACT,
  contractId: "contractId",
  contractName: "contractName",
  usernameFrom: "usernameFrom",
  createdAt: "createdAt",
  isNew: false,
  userId: "userId",
};
describe("Notification translator", () => {
  it("translate notification list", () => {
    expect(
      translateNotificationList([
        TEST_NOTIFICATION,
        { ...TEST_NOTIFICATION, contractName: null },
      ])
    ).toEqual([
      {
        id: TEST_NOTIFICATION._id,
        type: TEST_NOTIFICATION.type,
        contractId: TEST_NOTIFICATION.contractId,
        contractName: ` “${TEST_NOTIFICATION.contractName}”`,
        usernameFrom: TEST_NOTIFICATION.usernameFrom,
        createdAt: TEST_NOTIFICATION.createdAt,
        isNew: TEST_NOTIFICATION.isNew,
        userId: TEST_NOTIFICATION.userId,
      },
      {
        id: TEST_NOTIFICATION._id,
        type: TEST_NOTIFICATION.type,
        contractId: TEST_NOTIFICATION.contractId,
        contractName: "",
        usernameFrom: TEST_NOTIFICATION.usernameFrom,
        createdAt: TEST_NOTIFICATION.createdAt,
        isNew: TEST_NOTIFICATION.isNew,
        userId: TEST_NOTIFICATION.userId,
      },
    ]);
  });
});

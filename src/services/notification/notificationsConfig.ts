import {BUTTON_COLORTYPE} from "../../store/modules/main/types";
import {requestAcceptInvite} from "../../store/modules/contract/action-creators";

interface configActionsInterface {
  name: string;
  colortype: BUTTON_COLORTYPE;
  actionHandler?: (id: string) => void;
}

interface NotificationInterface {
  message: string;
  actions: configActionsInterface[];
}
export enum NOTIFICATION_TYPE {
  INVITE_USER_TO_CONTRACT = "user_invited_to_contract",
  ACCEPT_INVITE = "accept_invite",
  INVITE_REJECTED = "invite_to_contract_rejected",
  DELETED_FROM_CONTRACT = "deleted_from_contract"
}

export type notificationConfigInterface = Record<
  NOTIFICATION_TYPE,
  NotificationInterface
>;

export const notificationConfig: notificationConfigInterface = {
  user_invited_to_contract: {
    message: "notifications.messages.invited",
    actions: [
      {
        name: "notifications.modal_buttons.cancel",
        colortype: BUTTON_COLORTYPE.ERROR,
      },
      {
        name: "notifications.modal_buttons.accept",
        colortype: BUTTON_COLORTYPE.PRIMARY,
        actionHandler: requestAcceptInvite,
      },
    ],
  },
  accept_invite: {
    message: "notifications.messages.accepted_invite",
    actions: [
      {
        name: "notifications.modal_buttons.ok",
        colortype: BUTTON_COLORTYPE.PRIMARY,
      },
    ],
  },
  invite_to_contract_rejected: {
    message: "notifications.messages.invite_to_contract_rejected",
    actions: [
      {
        name: "notifications.modal_buttons.ok",
        colortype: BUTTON_COLORTYPE.PRIMARY
      }
    ]
  },
  deleted_from_contract: {
    message: "notifications.messages.removed_from_contract",
    actions: [
      {
        name: "notifications.modal_buttons.ok",
        colortype: BUTTON_COLORTYPE.PRIMARY
      }
    ]
  }
};

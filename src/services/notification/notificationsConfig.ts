import {BUTTON_COLORTYPE} from "../../store/modules/main/types";

interface configActionsInterface {
  name: string;
  colortype: BUTTON_COLORTYPE;
  actionHandler?: () => void;
}

interface NotificationInterface {
  message: string;
  actions: configActionsInterface[];
}
export enum NOTIFICATION_TYPE {
  INVITE_USER_TO_CONTRACT = "user_invited_to_contract",
  ACCEPT_INVITE = "accept_invite"
}

export type notificationConfigInterface = Record<NOTIFICATION_TYPE, NotificationInterface>


export const notificationConfig: notificationConfigInterface = {
  user_invited_to_contract: {
    message: "notifications.messages.invited",
    actions: [
      {
        name: "notifications.modal_buttons.cancel",
        colortype: BUTTON_COLORTYPE.ERROR,
        actionHandler() {
          return "";
        },
      },
      {
        name: "notifications.modal_buttons.accept",
        colortype: BUTTON_COLORTYPE.PRIMARY,
      },
    ],
  },
  accept_invite: {
    message: 'notifications.messages.accepted_invite',
    actions: [
      {
        name: 'notifications.modal_buttons.ok',
        colortype: BUTTON_COLORTYPE.PRIMARY
      }
    ]
  }
};

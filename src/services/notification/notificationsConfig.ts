import { BUTTON_COLORTYPE } from "../../store/modules/main/types";

interface configActionsInterface {
  name: string;
  colortype: BUTTON_COLORTYPE;
  actionHandler: () => void;
}

interface NotificationInterface {
  message: string;
  actions: configActionsInterface;
}

export interface notificationConfigInterface {
  user_invited_to_contract: NotificationInterface;
  invite_to_contract_rejected: NotificationInterface;
}

export const notificationConfig: notificationConfigInterface = {
  user_invited_to_contract: {
    message: "notifications.messages.invited",
    actionsNew: [
      {
        name: "notifications.modal_buttons.cancel",
        colortype: BUTTON_COLORTYPE.ERROR,
        actionHandler(): void {
          return;
        },
      },
      {
        name: "notifications.modal_buttons.accept",
        colortype: BUTTON_COLORTYPE.PRIMARY,
      },
    ],
    actions: [
      {
        name: "notifications.modal_buttons.ok",
        colortype: BUTTON_COLORTYPE.PRIMARY,
      },
    ],
  },
  invite_to_contract_rejected: {
    message: "notifications.messages.rejected",
    actions: [
      {
        name: "notifications.modal_buttons.ok",
        colortype: BUTTON_COLORTYPE.PRIMARY,
      },
    ],
  },
};

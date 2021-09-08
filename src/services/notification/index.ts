import { BUTTON_COLORTYPE } from "../../store/modules/main/types";

interface configActionsInterface {
  name: string;
  colortype: BUTTON_COLORTYPE;
  action: () => void;
}

interface notificationInterface {
  message: string;
  actions: configActionsInterface;
  action: () => void;
}

export interface notificationConfigInterface {
  user_invited_to_contract: notificationInterface;
  invite_to_contract_rejected: notificationInterface;
}

export const notificationConfig = {
  user_invited_to_contract: {
    message: "notifications.messages.invited",
    actions: [
      {
        name: "notifications.modal_buttons.ok",
        colortype: BUTTON_COLORTYPE.ERROR,
      },
      {
        name: "notifications.modal_buttons.ok",
        colortype: BUTTON_COLORTYPE.PRIMARY,
      },
    ],
    action(): void {
      return;
    },
  },
  invite_to_contract_rejected: {
    message: "notifications.messages.invited",
    actions: [
      {
        name: "notifications.modal_buttons.ok",
        colortype: BUTTON_COLORTYPE.PRIMARY,
      },
    ],
  },
};

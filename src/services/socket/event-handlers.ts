import { Dispatch } from "@reduxjs/toolkit";
import { addNotificationToList } from "../../store/modules/notifications/slice";
import { translateNotification } from "../notification/translator";

export enum SOKET_EVENT {
  NOTIFY = "notify",
}

type SocketEventHandlerType = (dispatch: Dispatch, event: any) => void;

const notifyEventHandler: SocketEventHandlerType = (
  dispatch: Dispatch,
  notification: any
) => {
  dispatch(addNotificationToList(translateNotification(notification)));
};

const config: Record<SOKET_EVENT, SocketEventHandlerType> = {
  [SOKET_EVENT.NOTIFY]: notifyEventHandler,
};

export default config;

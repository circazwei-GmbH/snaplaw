import {Dispatch} from "@reduxjs/toolkit";

export enum SOKET_EVENT {
  NOTIFY = "notify"
}

type SocketEventHandlerType = (dispatch: Dispatch, event: any) => void;

const notifyEventHandler: SocketEventHandlerType = (dispatch: Dispatch, event: any) => {
  console.log(event)
}

const config: Record<SOKET_EVENT, SocketEventHandlerType> = {
  [SOKET_EVENT.NOTIFY]: notifyEventHandler
}

export default config;

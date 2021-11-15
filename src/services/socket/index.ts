import io, { Socket } from "socket.io-client";
import { API_HOST } from "../../env/env";
import { Dispatch } from "@reduxjs/toolkit";
import Handlers, { SOKET_EVENT } from "./event-handlers";
import { getAuthTokens } from "../auth/tokens";
import { setMessage } from "../../store/modules/main/slice";

let socket: Socket | null = null;
let dispatcher: Dispatch | null = null;
let reconnectTimer: NodeJS.Timeout | null = null;

export const connect = (
  dispatch: Dispatch | null = dispatcher
): Promise<Socket> => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
  }
  if (!dispatch) {
    return Promise.reject("dispatch not provided");
  }
  dispatcher = dispatch;
  return new Promise(async (resolve) => {
    const { token } = await getAuthTokens();
    if (!socket) {
      socket = io(API_HOST, {
        autoConnect: false,
        reconnection: false,
        auth: { token },
      });
      socket.on("connect", () => {
        appliyHandlers(dispatch);
        // @ts-ignore
        resolve(socket);
      });
      socket.on("connect_error", () => {
        reconnectTimer = setTimeout(() => {
          connect().then(resolve);
        }, 2000);
        // @ts-ignore
        //TODO: investigate why socket does not connect
        dispatch(setMessage("socket connecion error"));
        socket.disconnect();
      });
    } else {
      socket.auth.token = token;
    }
    socket.connect();
  });
};

export const disconnect = (): Promise<null> => {
  return new Promise((resolve) => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
    }
    if (!socket) {
      return resolve();
    }
    socket.on("disconnect", () => {
      socket = null;
      resolve();
    });
    socket.disconnect();
  });
};

export const appliyHandlers = (dispatch: Dispatch) => {
  if (!socket) {
    throw new Error("Socket not connected");
  }
  for (let handlerName in Handlers) {
    if (socket.listeners(handlerName).length) {
      continue;
    }
    socket.on(handlerName, (event) =>
      Handlers[handlerName as SOKET_EVENT](dispatch, event)
    );
  }
};

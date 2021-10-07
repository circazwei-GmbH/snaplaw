import io, { Socket } from "socket.io-client";
import { API_HOST } from "../../env/env";
import { Dispatch } from "@reduxjs/toolkit";
import Handlers, { SOKET_EVENT } from "./event-handlers";
import { getAuthTokens } from "../auth/tokens";

let socket: Socket | null = null;
let dispatcher: Dispatch | null = null;
let reconnectTimer: number | null = null;

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
  if (socket) {
    return Promise.resolve(socket);
  }
  return new Promise(async (resolve) => {
    const { token } = await getAuthTokens();
    const localSocket = io(API_HOST, { autoConnect: false, auth: { token } });
    localSocket.on("connect", () => {
      socket = localSocket;
      appliyHandlers(dispatch);
      resolve(socket);
    });
    localSocket.on("connect_error", () => {
      reconnectTimer = setTimeout(connect, 2000);
      localSocket.disconnect();
    });
    localSocket.connect();
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
    socket.on(handlerName, (event) =>
      Handlers[handlerName as SOKET_EVENT](dispatch, event)
    );
  }
};

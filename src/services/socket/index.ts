import io, {Socket} from "socket.io-client";
import {API_HOST, SOKET_API_HOST} from "../../env/env";
import {Dispatch} from "@reduxjs/toolkit";
import Handlers, {SOKET_EVENT} from "./event-handlers";

let socket: Socket | null = null;

export const connect = (dispatch: Dispatch, token: string): Promise<Socket> => {
  if (socket) {
    return Promise.resolve(socket);
  }
  const localSocket = io(API_HOST, {autoConnect: false, auth: {token}});
  return new Promise((resolve) => {
    localSocket.on('connect', () => {
      socket = localSocket;
      appliyHandlers(dispatch);
      resolve(socket);
    });
    localSocket.on("connect_error", (error) => {
      localSocket.disconnect();
    })
    // localSocket.auth = token;
    localSocket.connect();
  });
}

export const disconnect = (): Promise<null> => {
  return new Promise((resolve => {
    if (!socket) {
      return;
    }
    socket.on('disconnect', () => {
      socket = null;
      resolve();
    })
    socket.disconnect();
  }))

}

export const appliyHandlers = (dispatch: Dispatch) => {
  if (!socket) {
    throw new Error('Socket not connected')
  }
  for(let handlerName in Handlers) {
    socket.on(handlerName, (event) => Handlers[(handlerName as SOKET_EVENT)](dispatch, event))
  }
}
import {connect, disconnect} from "../index"
import io from "socket.io-client";
import {Dispatch} from "@reduxjs/toolkit";
import { getAuthTokens } from "../../auth/tokens";
import {API_HOST} from "../../../env/env";
jest.mock("../../auth/tokens", () => ({
  getAuthTokens: jest.fn().mockReturnValue({token: "test-token"})
}))
const ioInstance = {
  connectionError: false,
  disconnect: jest.fn().mockImplementation(() => {
    ioInstance.callbacks.disconnect()
  }),
  connect: jest.fn().mockImplementation(() => {
    if (ioInstance.connectionError) {
      ioInstance.callbacks.connect_error()
    } else {
      ioInstance.callbacks.connect()
    }
  }),
  listeners: (name: "connect" | "connect_error" | "disconnect") => {
    return [ioInstance.callbacks[name]]
  },
  callbacks: {
    connect: () => {},
    connect_error: () => {},
    disconnect: () => {}
  },
  on: (eventName: "connect" | "connect_error" | "disconnect", callback: () => {}) => {
    ioInstance.callbacks[eventName] = callback;
  }
};
// @ts-ignore
const dispatchInstance: Dispatch = {};

describe("connect", () => {
  it("Should reject without dispatcher", () => {
    expect(connect()).rejects.toEqual("dispatch not provided")
  });
  it("Should succesfuly connected", async () => {
    // @ts-ignore
    io.mockImplementation(() => {
      setTimeout(() => {
        ioInstance.callbacks.connect()
      }, 10);
      return ioInstance
    })
    await connect(dispatchInstance)
    expect(getAuthTokens).toBeCalled()
    expect(ioInstance.connect).toBeCalled()
    expect(io).toBeCalledWith(API_HOST, { autoConnect: false, auth: { token: "test-token" } })
  })
  it("Should dicsonnected", async () => {
    await disconnect();
    expect(ioInstance.disconnect).toBeCalled()
  })
  it("Should error connected", async () => {
    // @ts-ignore
    io.mockImplementationOnce(() => {
      setTimeout(() => {
        ioInstance.callbacks.connect_error()
      }, 10);
      return ioInstance
    }).mockImplementationOnce(() => {
      setTimeout(() => {
        ioInstance.callbacks.connect()
      }, 10);
      return ioInstance
    })
    await connect(dispatchInstance)
    expect(getAuthTokens).toBeCalled()
    expect(ioInstance.connect).toBeCalled()
    expect(ioInstance.disconnect).toBeCalled()
    expect(io).toBeCalledWith(API_HOST, { autoConnect: false, auth: { token: "test-token" } })
  })
});

import API from "../api";
import axios from "axios";
import {connect} from "../socket";

jest.mock("axios");
jest.mock("../socket/index");
const url = "testurl";
const body = { data: "test" };
const options = { headers: { test: "test" } };
const accessToken = "token";
const refreshToken = "refresh";
describe("API", () => {
  beforeEach(() => {
    API.setToken(accessToken, refreshToken);
  });
  it("setToken and getToken", () => {
    expect(API.getToken()).toEqual(accessToken);
  });
  it("Should call putWithoutHost to be called", () => {
    const host = "test_host";
    API.putWithoutHost(host, body, options);
    expect(axios.put).toBeCalledWith(host, body, options);
  });
  it("Call get", async () => {
    await API.get(url);
    expect(axios.request).toBeCalledWith({
      method: "GET",
      url: `test_host/${url}`,
      data: null,
      headers: {
        authorization: `Bearer ${API.getToken()}`,
      },
    });
  });
  it("Call post", async () => {
    await API.post(url, body, options);
    expect(axios.request).toBeCalledWith({
      method: "POST",
      url: `test_host/${url}`,
      data: body,
      headers: {
        authorization: `Bearer ${API.getToken()}`,
        ...options.headers,
      },
    });
  });
  it("Call put", async () => {
    await API.put(url, body);
    expect(axios.request).toBeCalledWith({
      method: "PUT",
      url: `test_host/${url}`,
      data: body,
      headers: {
        authorization: `Bearer ${API.getToken()}`,
      },
    });
  });
  it("Call delete", async () => {
    await API.delete(url, body);
    expect(axios.request).toBeCalledWith({
      method: "DELETE",
      url: `test_host/${url}`,
      headers: {
        authorization: `Bearer ${API.getToken()}`,
      },
    });
  });
  it("Call patch", async () => {
    await API.patch(url, body);
    expect(axios.request).toBeCalledWith({
      method: "PATCH",
      url: `test_host/${url}`,
      data: body,
      headers: {
        authorization: `Bearer ${API.getToken()}`,
      },
    });
  });
  it("Refresh functionality test", async () => {
    // @ts-ignore
    axios.request
      .mockImplementationOnce(
        () =>
          new Promise((resolve, reject) =>
            reject({
              response: {
                status: 401,
              },
            })
          )
      )
      .mockImplementationOnce(() => new Promise((resolve) => resolve({})));
    // @ts-ignore
    axios.post.mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({
            data: {
              token: "new-token",
              refreshToken: "refresh",
            },
          })
        )
    );
    API.setToken(undefined, undefined);
    await API.get(url);
    expect(API.getToken()).toEqual("new-token");
    expect(connect).toBeCalled()
  });
  it("Should to be thrown", async () => {
    // @ts-ignore
    axios.request.mockImplementationOnce(
      () =>
        new Promise((resolve, reject) =>
          reject({
            response: {
              status: 500,
            },
          })
        )
    );
    await expect(API.get(url)).rejects.toEqual({
      response: {
        status: 500,
      },
    });
  });
});

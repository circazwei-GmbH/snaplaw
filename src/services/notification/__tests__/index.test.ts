import API from "../index";
import httpClient from "../../api";
import * as Translator from "../translator";
jest.mock("../../api.ts", () => ({
  get: jest.fn().mockReturnValueOnce({ data: "test" }),
  patch: jest.fn().mockReturnValueOnce("test-data"),
}));
jest.mock("../translator.ts", () => ({
  translateNotificationList: jest
    .fn()
    .mockImplementationOnce((arg) => `${arg}-data`),
}));
describe("Notification service", () => {
  it("request notifications action", async () => {
    const result = await API.requestNotifications("3");
    expect(result).toEqual("test-data");
    expect(httpClient.get).toBeCalledWith("api/notifications?page=3");
    expect(Translator.translateNotificationList).toBeCalledWith("test");
  });
  it("request change status notification", async () => {
    const result = await API.requestChangeStatus("testId");
    expect(result).toEqual("test-data");
    expect(httpClient.patch).toBeCalledWith(
      "api/notifications/testId/read",
      {}
    );
  });
});

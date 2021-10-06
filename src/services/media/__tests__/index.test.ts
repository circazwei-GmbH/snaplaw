import API, { MEDIA_TYPE } from "../index";
const blobFunction = jest.fn();
const PATH = "http://test-host/folder/name?data=type";
jest.mock("../../api.ts", () => ({
  get: jest.fn().mockImplementation(() => {
    return {
      data: "http://test-host/folder/name?data=type",
    };
  }),
}));
jest.mock("react-native-mime-types", () => ({
  lookup: jest
    .fn()
    .mockImplementationOnce(() => "image/png")
    .mockImplementationOnce(() => "video/mp4")
    .mockImplementationOnce(() => "test/mp4"),
}));

global.fetch = jest.fn().mockImplementation((path) => {
  if (path === PATH) {
    return {
      data: PATH,
    };
  } else {
    return {
      blob: blobFunction,
    };
  }
});
describe("Media Service", () => {
  it("image action", async () => {
    // @ts-ignore
    const result = await API.mediaProcess({ uri: "test", folder: "folder" });
    expect(result).toEqual({
      uri: "folder/name",
      type: MEDIA_TYPE.IMAGE,
    });
  });
  it("video action", async () => {
    // @ts-ignore
    const result = await API.mediaProcess({ uri: "test", folder: "folder" });
    expect(result).toEqual({
      uri: "folder/name",
      type: MEDIA_TYPE.VIDEO,
    });
  });
  it("video action", async () => {
    // @ts-ignore
    const result = await API.mediaProcess({ uri: "test", folder: "folder" });
    expect(result).toEqual({
      uri: "folder/name",
      type: undefined,
    });
  });
});

import * as MediaPicker from "../media-picker";
import {
  CameraPermissionNotGranted,
  LibrarryPermissionNotGranted,
} from "../errors";
import * as ImagePicker from "expo-image-picker";

jest.mock("expo-image-picker", () => ({
  ...jest.requireActual("expo-image-picker"),
  requestMediaLibraryPermissionsAsync: jest
    .fn()
    .mockReturnValueOnce({ status: "denied" })
    .mockReturnValue({ status: "granted" }),
  requestCameraPermissionsAsync: jest
    .fn()
    .mockReturnValueOnce({ status: "denied" })
    .mockReturnValue({ status: "granted" }),
  launchImageLibraryAsync: jest
    .fn()
    .mockReturnValueOnce({ cancelled: false, uri: "test/uri" })
    .mockReturnValueOnce({ cancelled: true }),
  launchCameraAsync: jest
    .fn()
    .mockReturnValueOnce({ cancelled: false, uri: "camera/uri" })
    .mockReturnValueOnce({ cancelled: true }),
}));
describe("MediaPicker", () => {
  it("Should throw error library way on permission not granted", async () => {
    await expect(MediaPicker.libraryWay()).rejects.toThrow(
      LibrarryPermissionNotGranted
    );
  });
  it("Should library way on permission granted", async () => {
    expect(
      await MediaPicker.libraryWay(ImagePicker.MediaTypeOptions.All)
    ).toEqual("test/uri");
    expect(ImagePicker.launchImageLibraryAsync).toBeCalledWith({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.5,
    });
  });
  it("Should library way on permission granted and cancelled", async () => {
    expect(await MediaPicker.libraryWay()).toEqual(undefined);
    expect(ImagePicker.launchImageLibraryAsync).toBeCalledWith({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
  });
  it("Should throw camera way on pesmission not granted", async () => {
    await expect(MediaPicker.cameraWay()).rejects.toThrow(
      CameraPermissionNotGranted
    );
  });
  it("Should success camera way on permission granted", async () => {
    expect(
      await MediaPicker.cameraWay(ImagePicker.MediaTypeOptions.All)
    ).toEqual("camera/uri");
    expect(ImagePicker.launchCameraAsync).toBeCalledWith({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.5,
    });
  });
  it("Should return undefined on cancelled choose", async () => {
    expect(await MediaPicker.cameraWay()).toEqual(undefined);
    expect(ImagePicker.launchCameraAsync).toBeCalledWith({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
  });
});

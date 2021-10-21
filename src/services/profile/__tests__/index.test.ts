import httpClient from '../../api';
import API from '../index'
import {MEDIA_TYPE} from "../../media";
import {UserType} from "../../../store/modules/profile/slice";

jest.mock("../../../utils", () => ({
  getUserFromToken: jest.fn().mockImplementation((arg) => {
    if(arg === 'test') {
      return null
    } else {
      return { _id: "testId" }
    }
  })
}))

jest.mock("../../api")

const userProfile: UserType = {
  id: "test",
  avatar: {
    type: MEDIA_TYPE.IMAGE,
    uri: "test"
  }
}

httpClient.getToken
  // @ts-ignore
  .mockReturnValueOnce(null)
  .mockReturnValueOnce("test")
  .mockReturnValueOnce('user')
  .mockReturnValueOnce(null)
  .mockReturnValueOnce("test")
  .mockReturnValueOnce('user')

describe("Profile servece", () => {
  it("Should error on update avatar", () => {
    expect(API.updateUserAvatar).toThrow(Error)
  })
  it("Should error on empty user", () => {
    expect(API.updateUserAvatar).toThrow(Error)
  })
  it("Should success update", () => {
    API.updateUserAvatar({type: MEDIA_TYPE.IMAGE, uri: "test"})
    expect(httpClient.put).toBeCalledWith("api/users/testId", { avatar: { type: "IMAGE", uri: 'test' } })
  })
  it("Should throw error on edit profile", () => {
    expect(API.editProfileSaveChange).toThrow(Error)
  })
  it("Should throw error on edit profile with wrong token", () => {
    expect(API.editProfileSaveChange).toThrow(Error)
  })
  it("Should edit profile success", () => {
    API.editProfileSaveChange(userProfile)
    expect(httpClient.put).toBeCalledWith("api/users/testId", userProfile)
  })
  it("Should success request me", () => {
    API.requestMe()
    expect(httpClient.get).toBeCalledWith("me")
  })
  it("Should success requested profile", () => {
    API.requestUserProfile('testId')
    expect(httpClient.get).toBeCalledWith("api/users/testId")
  })
})
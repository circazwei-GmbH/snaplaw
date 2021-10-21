import * as Prefiller from '../user-data-prefiller'
import {MEDIA_TYPE} from "../../media";
import {CONTRACT_SCREEN_TYPES} from "../../../store/modules/contract/constants";

describe("UserDataPrefiller", () => {
  it("Should prefill data", () => {
    expect(Prefiller.prefillUserData({
      id: "testUserId",
      avatar: {
        type: MEDIA_TYPE.IMAGE,
        uri: "testUri"
      },
      name: "firstName"
    })).toEqual({
      type: CONTRACT_SCREEN_TYPES.USER_DATA,
      data: {
        name: "firstName",
        lastName: "",
        email: "",
        address: "",
        phone: "",
        postCode: "",
        dateOfBirth: ""
      }
    })
  })
})
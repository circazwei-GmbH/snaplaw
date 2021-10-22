import * as Translator from '../prepare-translator'
import {CONTRACT_ROLE} from "../../../store/modules/contract/contract-roles";
import {CONTRACT_SCREEN_TYPES} from "../../../store/modules/contract/constants";

const TEST_CONTRACT = {
  _id: "testContractId",
  type: "PURCHASE",
  createdAt: "dataString",
  partnerId: "contractPartnerId",
  ownerId: "meId",
  finalizedAt: null,
  screens: [{
    screenType: CONTRACT_SCREEN_TYPES.CONFIRMATION,
    title: "some title"
  }],
  title: "testTitle",
  partnerName: "name",
  sign: true,
  oponentSign: false
}

describe("Prepare Translator", () => {
  it("Should successfyly translated", () => {
    expect(Translator.translateContractList([TEST_CONTRACT], "meId")).toEqual([{
      id: TEST_CONTRACT._id,
      type: TEST_CONTRACT.type,
      createdAt: TEST_CONTRACT.createdAt,
      title: TEST_CONTRACT.title,
      ownerId: TEST_CONTRACT.ownerId,
      partnerId: TEST_CONTRACT.partnerId,
      meRole: CONTRACT_ROLE.OWNER,
      finalizedAt: TEST_CONTRACT.finalizedAt
    }])
  })
  it("Should success translated single", () => {
    expect(Translator.translateContract(TEST_CONTRACT, "contractPartnerId")).toEqual({
      id: TEST_CONTRACT._id,
      type: TEST_CONTRACT.type,
      createdAt: TEST_CONTRACT.createdAt,
      partnerId: TEST_CONTRACT.partnerId,
      meRole: CONTRACT_ROLE.PARTNER,
      partnerName: TEST_CONTRACT.partnerName,
      oponentSign: TEST_CONTRACT.oponentSign,
      sign: TEST_CONTRACT.sign,
      screens: [{
        data: {
          screenType: TEST_CONTRACT.screens[0].screenType,
          title: TEST_CONTRACT.screens[0].title
        },
        type: TEST_CONTRACT.screens[0].screenType
      }]
    })
  })
})
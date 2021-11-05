import API from '../index'
import {CONTRACT_SCREEN_TYPES, CONTRACT_TYPES} from "../../../store/modules/contract/constants";
import httpClient from "../../api"
import {BaseScreenDataInterface} from "../../../store/modules/contract/base-types";
import {CONTRACT_ROLE} from "../../../store/modules/contract/contract-roles";
import { screenDataTranslator } from "../post-translator"
import {InviteUserInterface, RequestGetEmailsInterface} from "../../../store/modules/contract/types";
jest.mock("../../api")
jest.mock("../post-translator", () => ({
  screenDataTranslator: jest.fn().mockReturnValue({screen: 'data'})
}))

describe("Contract service", () => {
  it("Create Contract Action", () => {
    API.createContract(CONTRACT_TYPES.CAR);
    expect(httpClient.post).toBeCalledWith("api/contracts", {type: CONTRACT_TYPES.CAR})
  })
  it("Save screen data", () => {
    const CONTRACT_ID = "contractId";
    const CONTRACT_SCREEN: BaseScreenDataInterface = {
      type: CONTRACT_SCREEN_TYPES.CONFIRMATION,
      data: {
        test: 'data'
      }
    };

    API.saveScreenData(CONTRACT_ID, CONTRACT_SCREEN, CONTRACT_ROLE.OWNER)
    expect(httpClient.put).toBeCalledWith(`api/contracts/${CONTRACT_ID}`, {
      screen: 'data',
      isDropSign: false
    })
    expect(screenDataTranslator).toBeCalledWith(CONTRACT_SCREEN, CONTRACT_ROLE.OWNER)
  })
  it("Invite user action", () => {
    const CONTRACT_DATA: InviteUserInterface = {
      contractId: "contractId",
      search: "mail@host.domen"
    }
    API.inviteUser(CONTRACT_DATA)
    expect(httpClient.post).toBeCalledWith(`api/contracts/${CONTRACT_DATA.contractId}/invite-user`, {
      email: CONTRACT_DATA.search
    })
  })
  it("Get user emails", async () => {
    const SEARCH_DATA: RequestGetEmailsInterface = {
      payload: "test",
      page: '0'
    }
    // @ts-ignore
    httpClient.get.mockReturnValueOnce({data: "test"})
    expect(await API.getUserEmails(SEARCH_DATA)).toEqual("test")
    expect(httpClient.get).toBeCalledWith(`api/contracts/invited-emails?search=${SEARCH_DATA.payload}&page=${SEARCH_DATA.page}`)
  })
})
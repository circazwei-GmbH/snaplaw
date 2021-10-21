import * as Service from '../service'
import {CONTRACT_ROLE} from "../../../store/modules/contract/contract-roles";

describe("Contract service test", () => {
  it("Should detect owner role", () => {
    expect(Service.detectContractRole('pId', 'oId', 'oId')).toEqual(CONTRACT_ROLE.OWNER)
  })
  it("Should detect partner role", () => {
    expect(Service.detectContractRole('pId', 'oId', 'pId')).toEqual(CONTRACT_ROLE.PARTNER)
  })
})
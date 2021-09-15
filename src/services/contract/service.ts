import {CONTRACT_ROLE, ContractDataType} from "../../store/modules/contract/types";

export const detectContractRole = (contract: ContractDataType, myId: string): CONTRACT_ROLE => {
  if (contract.ownerId === myId) {
    return CONTRACT_ROLE.OWNER
  }
  return CONTRACT_ROLE.PARTNER
}
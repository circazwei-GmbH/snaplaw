import {ContractDataType} from "../../store/modules/contract/types";
import {CONTRACT_ROLE} from "../../store/modules/contract/contract-screens-types";

export const detectContractRole = (contract: ContractDataType, myId: string): CONTRACT_ROLE => {
  if (contract.ownerId === myId) {
    return CONTRACT_ROLE.OWNER
  }
  return CONTRACT_ROLE.PARTNER
}
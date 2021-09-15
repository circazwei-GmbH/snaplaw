import {CONTRACT_ROLE, ContractDataListType, ContractDataType} from "../../store/modules/contract/types";

export const detectContractRole = (contract: ContractDataType | ContractDataListType, myId: string | undefined): CONTRACT_ROLE => {
  if (contract.ownerId === myId) {
    return CONTRACT_ROLE.OWNER
  }
  return CONTRACT_ROLE.PARTNER
}
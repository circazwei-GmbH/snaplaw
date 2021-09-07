import {ContractDataType, ContractListType, PRODUCT_DATA_FIELDS} from "../../store/modules/contract/types";
import {CONTRACT_SCREEN_TYPES} from "../../store/modules/contract/constants";

const translateContract = (contract: any): ContractDataType => ({
  id: contract._id,
  type: contract.type,
  createdAt: contract.createdAt,
  title: contract.screens.find((screen: { screenType: CONTRACT_SCREEN_TYPES; }) => screen.screenType === CONTRACT_SCREEN_TYPES.PRODUCT_DATA)?.[PRODUCT_DATA_FIELDS.subject],
  contractor: undefined
})

export const translateContractList = (list: Array<any>): ContractListType => list.map(contract => translateContract(contract))
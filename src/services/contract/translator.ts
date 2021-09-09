import {
  ContractDataListType,
  ContractDataType,
  ContractListType,
} from "../../store/modules/contract/types";

export const translateContractForList = (
  contract: any
): ContractDataListType => ({
  id: contract._id,
  type: contract.type,
  createdAt: contract.createdAt,
  title: contract.title,
  contractor: undefined,
});

export const translateContract = (contract: any): ContractDataType => ({
  id: contract._id,
  type: contract.type,
  createdAt: contract.createdAt,
  contractor: undefined,
  screens: contract.screens.map((screen: { screenType: any }) => ({
    type: screen.screenType,
    data: screen,
  })),
  sign: contract.sign,
});

export const translateContractList = (list: Array<any>): ContractListType =>
  list.map((contract) => translateContractForList(contract));

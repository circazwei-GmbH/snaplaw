import {
  ContractDataListType,
  ContractDataType,
  ContractListType,
} from "../../store/modules/contract/types";
import { detectContractRole } from "./service";

export const translateContractForList = (
  contract: any,
  meId: string | undefined
): ContractDataListType => ({
  id: contract._id,
  type: contract.type,
  createdAt: contract.createdAt,
  title: contract.title,
  ownerId: contract.ownerId,
  partnerId: contract.partnerId,
  meRole: detectContractRole(contract.partnerId, contract.ownerId, meId),
  finalizedAt: contract.finalizedAt,
});

export const translateContract = (
  contract: any,
  meId: string | undefined
): ContractDataType => ({
  id: contract._id,
  type: contract.type,
  createdAt: contract.createdAt,
  partnerId: contract.partnerId,
  meRole: detectContractRole(contract.partnerId, contract.ownerId, meId),
  screens: contract.screens.map((screen: { screenType: any }) => ({
    type: screen.screenType,
    data: screen,
  })),
  partnerName: contract.partnerName,
  sign: contract.sign,
  oponentSign: contract.oponentSign,
});

export const translateContractList = (
  list: Array<any>,
  meId: string | undefined
): ContractListType =>
  list.map((contract) => translateContractForList(contract, meId));

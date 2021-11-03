import { CONTRACT_SCREEN_TYPES } from "./constants";
import { getContractScreensConfig } from "./contract-screens-types";
import { ContractDataType } from "./types";

export const getTypeByContractAndScreen = (
  contract: ContractDataType,
  screenPosition: number
): CONTRACT_SCREEN_TYPES => {
  return getContractScreensConfig(contract)[screenPosition].type;
};

export const countToPopLength = (
  contract: ContractDataType,
  position: number
): number => {
  return getContractScreensConfig(contract).length - 1 - position;
};

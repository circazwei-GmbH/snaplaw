import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
import { getContractScreensConfig } from "./contract-screens-types";
import { CONTRACT_ROLE } from "./types";

export const getTypeByContractAndScreen = (
  contractType: CONTRACT_TYPES,
  myRole: CONTRACT_ROLE,
  screenPosition: number
): CONTRACT_SCREEN_TYPES => {
  return getContractScreensConfig(contractType, myRole)[screenPosition].type;
};

export const countToPopLength = (
  contractType: CONTRACT_TYPES,
  myRole: CONTRACT_ROLE,
  position: number
): number => {
  return getContractScreensConfig(contractType, myRole).length - 1 - position;
};

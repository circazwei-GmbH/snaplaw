import {CONTRACT_SCREEN_TYPES, CONTRACT_TYPES} from "./constants";
import {contractScreensConfig} from "./contract-screens-types";

export const getTypeByContractAndScreen = (contractType: CONTRACT_TYPES, screenPosition: number): CONTRACT_SCREEN_TYPES => {
  return contractScreensConfig[contractType][screenPosition].type
}

export const countToPopLength = (contractType: CONTRACT_TYPES, position: number): number => {
  return contractScreensConfig[contractType].length - 1 - position
}
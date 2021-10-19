import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
import { getContractScreensConfig } from "./contract-screens-types";
import { CONTRACT_ROLE } from "./contract-roles";
import { BaseScreenDataInterface } from "./base-types";

export const getTypeByContractAndScreen = (
  contractType: CONTRACT_TYPES,
  myRole: CONTRACT_ROLE,
  screens: BaseScreenDataInterface[] | undefined,
  screenPosition: number
): CONTRACT_SCREEN_TYPES => {
  return getContractScreensConfig(contractType, myRole, screens)[screenPosition].type;
};

export const countToPopLength = (
  contractType: CONTRACT_TYPES,
  myRole: CONTRACT_ROLE,
  screens: BaseScreenDataInterface[] | undefined,
  position: number
): number => {
  return getContractScreensConfig(contractType, myRole, screens).length - 1 - position;
};

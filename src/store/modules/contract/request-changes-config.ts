import { CONTRACT_SCREEN_TYPES } from "./constants";
import { ContractDataType } from "./types";
import { BaseScreenDataInterface } from "./base-types";
import { findScreentByType } from "../../../utils/helpers";

export const checkIsItChangeRequest = (
  contract: ContractDataType,
  screenType: CONTRACT_SCREEN_TYPES,
  screenPreviousVersion: BaseScreenDataInterface | undefined
): boolean => {
  if (!contract.oponentSign && !contract.sign) {
    return false;
  }
  const currentScreenData = findScreentByType(contract.screens, screenType);
  if (!currentScreenData) {
    return false;
  }
  if (!screenPreviousVersion) {
    return true;
  }
  
  for (let fieldName in screenPreviousVersion.data) {    
    if (
      screenPreviousVersion.data[fieldName] !==
      currentScreenData.data[fieldName]
    ) {
      return true;
    }
  }
  return false;
};

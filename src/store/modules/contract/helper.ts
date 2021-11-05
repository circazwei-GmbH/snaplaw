import { TType } from "../../../translator/i18n";
import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
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

export const getCheckboxesList = (
  fieldsArray: string[],
  screenData: Record<string, any> | undefined,
  contractType: CONTRACT_TYPES | undefined,
  screenType: CONTRACT_SCREEN_TYPES,
  translator: TType
) =>
  fieldsArray.map((field) => ({
    name: field,
    checked: !!screenData?.[field],
    translate: translator(
      `contracts.${contractType}.${screenType}.checkboxes.${field}`
    ),
  }));

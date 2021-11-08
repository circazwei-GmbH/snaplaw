import { TType } from "../../../translator/i18n";
import { ADDITIONAL_INFO_RENTAL_FIELDS } from "./additional-info-rental-data copy";
import { COMMON_ROOMS_FIELDS } from "./common-rooms-data";
import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
import { getContractScreensConfig } from "./contract-screens-types";
import { DIRECT_SUPPLY_FIELDS } from "./direct-supply-data";
import { SECONDARY_ROOMS_FIELDS } from "./secondary-rooms-data";
import { ContractDataType } from "./types";
import { USABLE_SPACES_FIELDS } from "./usable-spaces-data";

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
  fieldsArray:
    | ADDITIONAL_INFO_RENTAL_FIELDS[]
    | COMMON_ROOMS_FIELDS[]
    | DIRECT_SUPPLY_FIELDS[]
    | SECONDARY_ROOMS_FIELDS[]
    | USABLE_SPACES_FIELDS[],
  screenType: CONTRACT_SCREEN_TYPES,
  translator: TType,
  screenData?: Record<string, any>,
  contractType?: CONTRACT_TYPES
) =>
  fieldsArray.map((field) => ({
    name: field,
    checked: !!screenData?.[field],
    translate: translator(
      `contracts.${contractType}.${screenType}.checkboxes.${field}`
    ),
  }));

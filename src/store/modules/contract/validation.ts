import {CONTRACT_SCREEN_TYPES, CONTRACT_TYPES} from "./constants";
import {contractScreensConfig} from "./contract-screens-types";
import {BaseScreenDataInterface} from "./base-types";
import {USER_DATA_FIELDS, PRODUCT_DATA_FIELDS} from "./types";
import {length} from "../../../validations/default";

export const contractValidationConfig = {
  [CONTRACT_TYPES.PURCHASE]: {
    [CONTRACT_SCREEN_TYPES.USER_DATA]: {
      [USER_DATA_FIELDS.name]: [length('Field is required', 1)],
      [USER_DATA_FIELDS.lastName]: [length('f', 1)]
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_DATA]: {
      [PRODUCT_DATA_FIELDS.subject]: [length('field', 1)],
      [PRODUCT_DATA_FIELDS.producer]: [length('error', 1)]
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION]: {},
    [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {},
    [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {},
    [CONTRACT_SCREEN_TYPES.PAYMENT]: {},
    [CONTRACT_SCREEN_TYPES.SIGN]: {}
  }
}

export const contractValidator = (contractType: CONTRACT_TYPES, screens: Array<BaseScreenDataInterface>) => {
  const contractConfig = contractScreensConfig[contractType]
  let firstEmptyScreen = null;
  for(let i = 0; contractConfig.length > i; i++) {
    if (!screens.find(screen => screen.type === contractConfig[i].type)) {
      firstEmptyScreen = i;
      break;
    }
  }
  return firstEmptyScreen
}
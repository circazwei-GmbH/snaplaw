import {CONTRACT_SCREEN_TYPES, CONTRACT_TYPES} from "./constants";
import {contractScreensConfig} from "./contract-screens-types";
import {BaseScreenDataInterface} from "./base-types";
import {USER_DATA_FIELDS, PRODUCT_DATA_FIELDS} from "./types";
import {length, lengthCheckIfAnotherFieldIsTrue} from "../../../validations/default";

export const contractValidationConfig = {
  [CONTRACT_TYPES.PURCHASE]: {
    [CONTRACT_SCREEN_TYPES.USER_DATA]: {
      [USER_DATA_FIELDS.name]: [length('contracts.validation.field_empty', 1)],
      [USER_DATA_FIELDS.lastName]: [length('contracts.validation.field_empty', 1)],
      [USER_DATA_FIELDS.dateOfBirth]: [length('contracts.validation.field_empty', 1)],
      [USER_DATA_FIELDS.email]: [length('contracts.validation.field_empty', 1)],
      [USER_DATA_FIELDS.phone]: [length('contracts.validation.field_empty', 1)],
      [USER_DATA_FIELDS.address]: [length('contracts.validation.field_empty', 1)],
      [USER_DATA_FIELDS.postCode]: [length('contracts.validation.field_empty', 1)]
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_DATA]: {
      [PRODUCT_DATA_FIELDS.subject]: [length('contracts.validation.field_empty', 1)],
      [PRODUCT_DATA_FIELDS.producer]: [length('contracts.validation.field_empty', 1)],
      [PRODUCT_DATA_FIELDS.description]: [length('contracts.validation.field_empty', 1)],
      [PRODUCT_DATA_FIELDS.serial]: [lengthCheckIfAnotherFieldIsTrue('errors.abstract', 1, PRODUCT_DATA_FIELDS.isSerial)]
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION]: {},
    [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {},
    [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {},
    [CONTRACT_SCREEN_TYPES.PAYMENT]: {},
    [CONTRACT_SCREEN_TYPES.SIGN]: {}
  }
}

export const screenFieldValidator = (field: string, screenType: CONTRACT_SCREEN_TYPES, screen: BaseScreenDataInterface | undefined, contractType: CONTRACT_TYPES): string | undefined => {
  console.log('SCREEN FIELD FALIVATION', field, screenType)
  const validationConfig = contractValidationConfig[contractType][screenType]
    // @ts-ignore
  if (!validationConfig[field]) {
      return;
    }
    // @ts-ignore
    for(let i = 0; Object.keys(validationConfig[field]).length > i; i++) {
      // @ts-ignore
      const validated = validationConfig[field][i](screen?.data?.[field], screen?.data)
      if (validated) {
        return validated
      }
    }

}

export const contractValidator = (contractType: CONTRACT_TYPES, screens: Array<BaseScreenDataInterface>) => {
  const contractConfig = contractScreensConfig[contractType]
  let firstEmptyScreen = null;
  for(let i = 0; contractConfig.length > i; i++) {
    const currentScreen = screens.find(screen => screen.type === contractConfig[i].type)
    if (!currentScreen) {
      return i;
    } else {
      console.log(`screen found and started validation by field ${currentScreen.type}`)
      const validationConfig = contractValidationConfig[contractType][currentScreen.type]
      for(let field in validationConfig) {
        const validated = screenFieldValidator(field, currentScreen.type, currentScreen, contractType)
        console.log('validated result: ', validated)
        if (validated) {
          return i
        }
      }
    }
  }
  return firstEmptyScreen
}
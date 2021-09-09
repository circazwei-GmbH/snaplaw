import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
import { contractScreensConfig } from "./contract-screens-types";
import { BaseScreenDataInterface } from "./base-types";
import {
  USER_DATA_FIELDS,
  PRODUCT_DATA_FIELDS,
  PRODUCT_DESCRIPTION_FIELDS,
  CONFIRMATION_FIELDS,
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
} from "./types";
import {
  length,
  lengthCheckIfAnotherFieldHasSpecificValue,
  lengthCheckIfAnotherFieldIsTrue,
} from "../../../validations/default";
import { PRODUCT_CONDITION_FIELD_NAME } from "./purchase/product-condition";

export const contractValidationConfig = {
  [CONTRACT_TYPES.PURCHASE]: {
    [CONTRACT_SCREEN_TYPES.USER_DATA]: {
      [USER_DATA_FIELDS.name]: [length("contracts.validation.field_empty", 1)],
      [USER_DATA_FIELDS.lastName]: [
        length("contracts.validation.field_empty", 1),
      ],
      [USER_DATA_FIELDS.dateOfBirth]: [
        length("contracts.validation.field_empty", 1),
      ],
      [USER_DATA_FIELDS.email]: [length("contracts.validation.field_empty", 1)],
      [USER_DATA_FIELDS.phone]: [length("contracts.validation.field_empty", 1)],
      [USER_DATA_FIELDS.address]: [
        length("contracts.validation.field_empty", 1),
      ],
      [USER_DATA_FIELDS.postCode]: [
        length("contracts.validation.field_empty", 1),
      ],
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_DATA]: {
      [PRODUCT_DATA_FIELDS.subject]: [
        length("contracts.validation.field_empty", 1),
      ],
      [PRODUCT_DATA_FIELDS.producer]: [
        length("contracts.validation.field_empty", 1),
      ],
      [PRODUCT_DATA_FIELDS.description]: [
        length("contracts.validation.field_empty", 1),
      ],
      [PRODUCT_DATA_FIELDS.serial]: [
        lengthCheckIfAnotherFieldIsTrue(
          "contracts.validation.field_empty",
          1,
          PRODUCT_DATA_FIELDS.isSerial
        ),
      ],
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION]: {
      [PRODUCT_CONDITION_FIELD_NAME]: [
        length("contracts.validation.field_empty", 1),
      ],
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {
      [PRODUCT_DESCRIPTION_FIELDS.description]: [
        length("contracts.validation.field_empty", 1),
      ],
      [PRODUCT_DESCRIPTION_FIELDS.descriptionAccessories]: [
        lengthCheckIfAnotherFieldIsTrue(
          "contracts.validation.field_empty",
          1,
          PRODUCT_DESCRIPTION_FIELDS.hasAccessories
        ),
      ],
    },
    [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
      [CONFIRMATION_FIELDS.FIRST]: [
        length("contracts.validation.field_empty", 1),
      ],
      [CONFIRMATION_FIELDS.SECOND]: [
        length("contracts.validation.field_empty", 1),
      ],
    },
    [CONTRACT_SCREEN_TYPES.PAYMENT]: {
      [PAYMENT_FIELDS.COST]: [length("contracts.validation.field_empty", 1)],
      [PAYMENT_FIELDS.PAYMENT_METHOD]: [
        length("contracts.validation.field_empty", 1),
      ],
      [PAYMENT_FIELDS.CARD_NAME]: [
        lengthCheckIfAnotherFieldHasSpecificValue(
          "contracts.validation.field_empty",
          1,
          PAYMENT_FIELDS.PAYMENT_METHOD,
          PAYMENT_METHODS.TRANSFER
        ),
      ],
      [PAYMENT_FIELDS.CARD_NUMBER]: [
        lengthCheckIfAnotherFieldHasSpecificValue(
          "contracts.validation.field_empty",
          1,
          PAYMENT_FIELDS.PAYMENT_METHOD,
          PAYMENT_METHODS.TRANSFER
        ),
      ],
    },
    [CONTRACT_SCREEN_TYPES.SIGN]: {},
  },
};

export const screenFieldValidator = (
  field: string,
  screenType: CONTRACT_SCREEN_TYPES,
  screen: BaseScreenDataInterface | undefined,
  contractType: CONTRACT_TYPES
): string | undefined => {
  const validationConfig = contractValidationConfig[contractType][screenType];
  // @ts-ignore
  if (!validationConfig[field]) {
    return;
  }
  // @ts-ignore
  for (let i = 0; Object.keys(validationConfig[field]).length > i; i++) {
    // @ts-ignore
    const validated = validationConfig[field][i](
      screen?.data?.[field],
      screen?.data
    );
    if (validated) {
      return validated;
    }
  }
};

export const contractValidator = (
  contractType: CONTRACT_TYPES,
  screens: Array<BaseScreenDataInterface>
) => {
  const contractConfig = contractScreensConfig[contractType];

  let firstEmptyScreen = null;
  for (let i = 0; contractConfig.length > i; i++) {
    const currentScreen = screens.find(
      (screen) => screen.type === contractConfig[i].type
    );
    const validationConfig =
      contractValidationConfig[contractType][contractConfig[i].type];
    if (!currentScreen && Object.keys(validationConfig).length) {
      return i;
    } else if (!currentScreen) {
      // just continue
    } else {
      const validationConfig =
        contractValidationConfig[contractType][currentScreen.type];
      for (let field in validationConfig) {
        const validated = screenFieldValidator(
          field,
          currentScreen.type,
          currentScreen,
          contractType
        );
        if (validated) {
          return i;
        }
      }
    }
  }
  return firstEmptyScreen;
};

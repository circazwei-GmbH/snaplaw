import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
import { getContractScreensConfig } from "./contract-screens-types";
import { BaseScreenDataInterface } from "./base-types";
import {
  USER_DATA_FIELDS,
  PRODUCT_DATA_FIELDS,
  PRODUCT_DESCRIPTION_FIELDS,
  CONFIRMATION_FIELDS,
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
  ContractDataType,
} from "./types";
import {
  correctDateOrderCheck,
  length,
  lengthCheckIfAnotherFieldHasSpecificValue,
  lengthCheckIfAnotherFieldIsTrue,
  validateArrayByDataLength,
} from "../../../validations/default";
import { PRODUCT_CONDITION_FIELD_NAME } from "./purchase/product-condition";
import { CONTRACT_ROLE } from "./contract-roles";
import { MEMBER_TYPE_FIELD_NAME } from "./carSales/member-type";
import { COMPANY_DATA_FIELDS } from "./company-data";
import { PASSPORT_DATA_FIELDS } from "./passport-data";
import { CAR_DATA_FIELDS } from "./carSales/car-data";
import { SPECIFICATIONS_DATA_FIELDS } from "./specifications-data";
import { ADDITIONAL_INFO_FIELDS } from "./additional-info-data";
import { PAYMENT_INFO_FIELDS } from "./carSales/payment-info";
import { SERVICES_DATA_FIELDS } from "./work/services-data";
import { HOUSING_DATA_FIELDS } from "./housing-data";
import { SECONDARY_ROOMS_FIELDS } from "./secondary-rooms-data";
import { USABLE_SPACES_FIELDS } from "./usable-spaces-data";
import { COMMON_ROOMS_FIELDS } from "./common-rooms-data";

const canBeEmptyScreens = [
  CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO,
  CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
];

export const contractValidationConfig = {
  [CONTRACT_TYPES.PURCHASE]: {
    [CONTRACT_SCREEN_TYPES.USER_DATA]: {
      [CONTRACT_ROLE.OWNER]: {
        [USER_DATA_FIELDS.name]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.lastName]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.dateOfBirth]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.email]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.phone]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.address]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.postCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [USER_DATA_FIELDS.name]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.lastName]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.dateOfBirth]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.email]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.phone]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.address]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.postCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_DATA]: {
      [CONTRACT_ROLE.OWNER]: {
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
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION]: {
      [CONTRACT_ROLE.OWNER]: {
        [PRODUCT_CONDITION_FIELD_NAME]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {
      [CONTRACT_ROLE.OWNER]: {
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
    },
    [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
      [CONTRACT_ROLE.OWNER]: {
        [CONFIRMATION_FIELDS.FIRST]: [
          length("contracts.validation.field_empty", 1),
        ],
        [CONFIRMATION_FIELDS.SECOND]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [CONFIRMATION_FIELDS.SELLER_DETAIL]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.PAYMENT]: {
      [CONTRACT_ROLE.OWNER]: {
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
      [CONTRACT_ROLE.PARTNER]: {
        [PAYMENT_FIELDS.PAYMENT_METHOD]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.SIGN]: {},
  },
  [CONTRACT_TYPES.CAR]: {
    [CONTRACT_SCREEN_TYPES.MEMBER_TYPE]: {
      [CONTRACT_ROLE.OWNER]: {
        [MEMBER_TYPE_FIELD_NAME]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.USER_DATA]: {
      [CONTRACT_ROLE.OWNER]: {
        [USER_DATA_FIELDS.name]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.lastName]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.dateOfBirth]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.email]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.phone]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.address]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.postCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [USER_DATA_FIELDS.name]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.lastName]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.dateOfBirth]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.email]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.phone]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.address]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.postCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.PASSPORT_DATA]: {
      [CONTRACT_ROLE.OWNER]: {
        [PASSPORT_DATA_FIELDS.idCard]: [
          length("contracts.validation.field_empty", 1),
        ],
        [PASSPORT_DATA_FIELDS.identificationCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [PASSPORT_DATA_FIELDS.idCard]: [
          length("contracts.validation.field_empty", 1),
        ],
        [PASSPORT_DATA_FIELDS.identificationCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.COMPANY_DATA]: {
      [CONTRACT_ROLE.OWNER]: {
        [COMPANY_DATA_FIELDS.companyName]: [
          length("contracts.validation.field_empty", 1),
        ],
        [COMPANY_DATA_FIELDS.vatId]: [
          length("contracts.validation.field_empty", 1),
        ],
        [COMPANY_DATA_FIELDS.email]: [
          length("contracts.validation.field_empty", 1),
        ],
        [COMPANY_DATA_FIELDS.address]: [
          length("contracts.validation.field_empty", 1),
        ],
        [COMPANY_DATA_FIELDS.postCode]: [
          length("contracts.validation.field_empty", 1),
        ],
        [COMPANY_DATA_FIELDS.phone]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [COMPANY_DATA_FIELDS.companyName]: [
          length("contracts.validation.field_empty", 1),
        ],
        [COMPANY_DATA_FIELDS.vatId]: [
          length("contracts.validation.field_empty", 1),
        ],
        [COMPANY_DATA_FIELDS.email]: [
          length("contracts.validation.field_empty", 1),
        ],
        [COMPANY_DATA_FIELDS.address]: [
          length("contracts.validation.field_empty", 1),
        ],
        [COMPANY_DATA_FIELDS.postCode]: [
          length("contracts.validation.field_empty", 1),
        ],
        [COMPANY_DATA_FIELDS.phone]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_DATA]: {
      [CONTRACT_ROLE.OWNER]: {
        [CAR_DATA_FIELDS.producer]: [
          length("contracts.validation.field_empty", 1),
        ],
        [CAR_DATA_FIELDS.model]: [
          length("contracts.validation.field_empty", 1),
        ],
        [CAR_DATA_FIELDS.type]: [length("contracts.validation.field_empty", 1)],
        [CAR_DATA_FIELDS.year]: [length("contracts.validation.field_empty", 1)],
        [CAR_DATA_FIELDS.prevRegistrationNumber]: [
          length("contracts.validation.field_empty", 1),
        ],
        [CAR_DATA_FIELDS.serialNumber]: [
          length("contracts.validation.field_empty", 1),
        ],
        [CAR_DATA_FIELDS.run]: [length("contracts.validation.field_empty", 1)],
      },
    },
    [CONTRACT_SCREEN_TYPES.SPECIFICATIONS]: {
      [CONTRACT_ROLE.OWNER]: {
        [SPECIFICATIONS_DATA_FIELDS.INSPECTION_DATE]: [
          lengthCheckIfAnotherFieldIsTrue(
            "contracts.validation.field_empty",
            1,
            SPECIFICATIONS_DATA_FIELDS.INSPECTION
          ),
        ],
        [SPECIFICATIONS_DATA_FIELDS.DEREGISTERED_DATE]: [
          lengthCheckIfAnotherFieldIsTrue(
            "contracts.validation.field_empty",
            1,
            SPECIFICATIONS_DATA_FIELDS.DEREGISTERED
          ),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {
      [CONTRACT_ROLE.OWNER]: {
        [PRODUCT_DESCRIPTION_FIELDS.description]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO]: {
      [CONTRACT_ROLE.OWNER]: {
        [ADDITIONAL_INFO_FIELDS.ACCIDENT_DAMAGE_DESCRIPTION]: [
          lengthCheckIfAnotherFieldIsTrue(
            "contracts.validation.field_empty",
            1,
            ADDITIONAL_INFO_FIELDS.ACCIDENT_DAMAGE
          ),
        ],
        [ADDITIONAL_INFO_FIELDS.OTHER_DEFECTS_DESCRIPTION]: [
          lengthCheckIfAnotherFieldIsTrue(
            "contracts.validation.field_empty",
            1,
            ADDITIONAL_INFO_FIELDS.OTHER_DEFECTS
          ),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
      [CONTRACT_ROLE.OWNER]: {
        [CONFIRMATION_FIELDS.FIRST]: [
          length("contracts.validation.field_empty", 1),
        ],
        [CONFIRMATION_FIELDS.SECOND]: [
          length("contracts.validation.field_empty", 1),
        ],
        [CONFIRMATION_FIELDS.THIRD]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [CONFIRMATION_FIELDS.FIRST]: [
          length("contracts.validation.field_empty", 1),
        ],
        [CONFIRMATION_FIELDS.SECOND]: [
          length("contracts.validation.field_empty", 1),
        ],
        [CONFIRMATION_FIELDS.SELLER_DETAIL]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.PAYMENT_INFO]: {
      [CONTRACT_ROLE.OWNER]: {
        [PAYMENT_INFO_FIELDS.ACCOUNT_OWNER]: [
          length("contracts.validation.field_empty", 1),
        ],
        [PAYMENT_INFO_FIELDS.ACCOUNT_NUMBER]: [
          length("contracts.validation.field_empty", 1),
        ],
        [PAYMENT_INFO_FIELDS.IBAN]: [
          length("contracts.validation.field_empty", 1),
        ],
        [PAYMENT_INFO_FIELDS.BIC]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.PAYMENT]: {
      [CONTRACT_ROLE.OWNER]: {
        [PAYMENT_FIELDS.COST]: [length("contracts.validation.field_empty", 1)],
        [PAYMENT_FIELDS.PAYMENT_METHOD]: [
          length("contracts.validation.field_empty", 1),
        ],
        [PAYMENT_FIELDS.PAYMENT_DATE]: [
          lengthCheckIfAnotherFieldHasSpecificValue(
            "contracts.validation.field_empty",
            1,
            PAYMENT_FIELDS.PAYMENT_METHOD,
            PAYMENT_METHODS.CASH
          ),
        ],
        [PAYMENT_FIELDS.DUE_DATE]: [
          lengthCheckIfAnotherFieldHasSpecificValue(
            "contracts.validation.field_empty",
            1,
            PAYMENT_FIELDS.PAYMENT_METHOD,
            PAYMENT_METHODS.TRANSFER
          ),
        ],
        [PAYMENT_FIELDS.ADVANCE_COST]: [
          lengthCheckIfAnotherFieldHasSpecificValue(
            "contracts.validation.field_empty",
            1,
            PAYMENT_FIELDS.PAYMENT_METHOD,
            PAYMENT_METHODS.CASH_ADVANCE
          ),
        ],
        [PAYMENT_FIELDS.FIRST_DATE]: [
          lengthCheckIfAnotherFieldHasSpecificValue(
            "contracts.validation.field_empty",
            1,
            PAYMENT_FIELDS.PAYMENT_METHOD,
            PAYMENT_METHODS.CASH_ADVANCE
          ),
        ],
        [PAYMENT_FIELDS.SECOND_DATE]: [
          lengthCheckIfAnotherFieldHasSpecificValue(
            "contracts.validation.field_empty",
            1,
            PAYMENT_FIELDS.PAYMENT_METHOD,
            PAYMENT_METHODS.CASH_ADVANCE
          ),
          correctDateOrderCheck(
            "contracts.validation.uncorrect_date_order",
            PAYMENT_FIELDS.FIRST_DATE,
            PAYMENT_FIELDS.SECOND_DATE
          ),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [PAYMENT_FIELDS.PAYMENT_METHOD]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.SIGN]: {},
  },
  [CONTRACT_TYPES.WORK]: {
    [CONTRACT_SCREEN_TYPES.USER_DATA]: {
      [CONTRACT_ROLE.OWNER]: {
        [USER_DATA_FIELDS.name]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.lastName]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.dateOfBirth]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.email]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.phone]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.address]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.postCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [USER_DATA_FIELDS.name]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.lastName]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.dateOfBirth]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.email]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.phone]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.address]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.postCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.SERVICES]: {
      [CONTRACT_ROLE.OWNER]: {
        [SERVICES_DATA_FIELDS.SERVICES_DATA]: [
          validateArrayByDataLength("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {
      [CONTRACT_ROLE.OWNER]: {
        [PRODUCT_DESCRIPTION_FIELDS.description]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
      [CONTRACT_ROLE.OWNER]: {
        [CONFIRMATION_FIELDS.FIRST]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [CONFIRMATION_FIELDS.SELLER_DETAIL]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.PAYMENT]: {
      [CONTRACT_ROLE.PARTNER]: {
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
    },
    [CONTRACT_SCREEN_TYPES.SIGN]: {},
    [CONTRACT_SCREEN_TYPES.INVITE_USER]: {},
  },
  [CONTRACT_TYPES.RENTAL]: {
    [CONTRACT_SCREEN_TYPES.USER_DATA]: {
      [CONTRACT_ROLE.OWNER]: {
        [USER_DATA_FIELDS.name]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.lastName]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.dateOfBirth]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.email]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.phone]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.address]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.postCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [USER_DATA_FIELDS.name]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.lastName]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.dateOfBirth]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.email]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.phone]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.address]: [
          length("contracts.validation.field_empty", 1),
        ],
        [USER_DATA_FIELDS.postCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.PASSPORT_DATA]: {
      [CONTRACT_ROLE.OWNER]: {
        [PASSPORT_DATA_FIELDS.idCard]: [
          length("contracts.validation.field_empty", 1),
        ],
        [PASSPORT_DATA_FIELDS.identificationCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [PASSPORT_DATA_FIELDS.idCard]: [
          length("contracts.validation.field_empty", 1),
        ],
        [PASSPORT_DATA_FIELDS.identificationCode]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
      [CONTRACT_ROLE.OWNER]: {
        [CONFIRMATION_FIELDS.FIRST]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
      [CONTRACT_ROLE.PARTNER]: {
        [CONFIRMATION_FIELDS.FIRST]: [
          length("contracts.validation.field_empty", 1),
        ],
        [CONFIRMATION_FIELDS.SECOND]: [
          length("contracts.validation.field_empty", 1),
        ],
        [CONFIRMATION_FIELDS.THIRD]: [
          length("contracts.validation.field_empty", 1),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.ABOUT_HOUSING]: {
      [CONTRACT_ROLE.OWNER]: {
        [HOUSING_DATA_FIELDS.AREA]: [
          length("contracts.validation.field_empty", 1),
        ],
        [HOUSING_DATA_FIELDS.ROOMS_NUMBER]: [
          length("contracts.validation.field_empty", 1),
        ],
        [HOUSING_DATA_FIELDS.LOCATION]: [
          length("contracts.validation.field_empty", 1),
        ],
        [HOUSING_DATA_FIELDS.FURNISHED_DESCRIPTION]: [
          lengthCheckIfAnotherFieldIsTrue(
            "contracts.validation.field_empty",
            1,
            HOUSING_DATA_FIELDS.IS_FURNISHED
          ),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS]: {
      [CONTRACT_ROLE.OWNER]: {
        [SECONDARY_ROOMS_FIELDS.DESCRIPTION]: [
          lengthCheckIfAnotherFieldIsTrue(
            "contracts.validation.field_empty",
            1,
            SECONDARY_ROOMS_FIELDS.OTHER
          ),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.USABLE_SPACES]: {
      [CONTRACT_ROLE.OWNER]: {
        [USABLE_SPACES_FIELDS.DESCRIPTION]: [
          lengthCheckIfAnotherFieldIsTrue(
            "contracts.validation.field_empty",
            1,
            USABLE_SPACES_FIELDS.OTHER
          ),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.COMMON_ROOMS]: {
      [CONTRACT_ROLE.OWNER]: {
        [COMMON_ROOMS_FIELDS.DESCRIPTION]: [
          lengthCheckIfAnotherFieldIsTrue(
            "contracts.validation.field_empty",
            1,
            COMMON_ROOMS_FIELDS.OTHER
          ),
        ],
      },
    },
    [CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY]: {},
    [CONTRACT_SCREEN_TYPES.SIGN]: {},
  },
};

export const screenFieldValidator = (
  field: string,
  screenType: CONTRACT_SCREEN_TYPES,
  screen: BaseScreenDataInterface | undefined,
  contractType: CONTRACT_TYPES,
  myRole: CONTRACT_ROLE
): string | undefined => {
  const validationConfig =
    // @ts-ignore
    contractValidationConfig[contractType][screenType][myRole];

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

export const contractValidator = (contract: ContractDataType) => {
  const contractConfig = getContractScreensConfig(contract);

  let firstEmptyScreen = null;
  for (let i = 0; contractConfig.length > i; i++) {
    const currentScreen = contract.screens.find(
      (screen) => screen.type === contractConfig[i].type
    );

    const validationConfig =
      // @ts-ignore
      contractValidationConfig[contract.type][contractConfig[i].type][
        contract.meRole
      ];
    if (!validationConfig) {
      continue;
    }

    if (
      !currentScreen &&
      !canBeEmptyScreens.includes(contractConfig[i].type) &&
      validationConfig &&
      Object.keys(validationConfig).length
    ) {
      return i;
    } else if (!currentScreen) {
      // just continue
    } else {
      const validationConfig =
        // @ts-ignore
        contractValidationConfig[contract.type][currentScreen.type][
          contract.meRole
        ];
      if (validationConfig) {
        for (let field in validationConfig) {
          const validated = screenFieldValidator(
            field,
            currentScreen.type,
            currentScreen,
            contract.type,
            contract.meRole
          );
          if (validated) {
            return i;
          }
        }
      }
    }
  }
  return firstEmptyScreen;
};

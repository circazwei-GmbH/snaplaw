import { BaseAction } from "../auth/types";
import { CONTRACT_TYPES } from "./constants";
import {
  ProductDataScreenInterface,
  PRODUCT_DATA_FIELDS,
} from "./purchase/product-data";
import {
  UserDataScreenInterface,
  USER_DATA_FIELDS,
} from "./purchase/user-data";
import {
  ProductConditionScreenInterface,
  CONDITION_VALUE,
  CONDITIONS,
} from "./purchase/product-condition";
import {
  ConfirmationScreenInterface,
  CONFIRMATION_FIELDS,
  CONFIRMATION,
} from "./purchase/confirmation";
import {
  ProductDescriptionScreenInterface,
  PRODUCT_DESCRIPTION_FIELDS,
  PRODUCT_DESCRIPTION,
} from "./purchase/product-description";
import { BaseScreenDataInterface } from "./base-types";

export type ContractType = CONTRACT_TYPES.PURCHASE;

export interface RequestCreateContractAction extends BaseAction {
  payload: CONTRACT_TYPES;
}

export interface Contract {
  id: string;
  type: CONTRACT_TYPES;
  screens: Array<BaseScreenDataInterface>;
}

export interface RequestScreenDataAction extends BaseAction {
  payload: number;
}

export { ProductDataScreenInterface, PRODUCT_DATA_FIELDS };
export { UserDataScreenInterface, USER_DATA_FIELDS };
export { ProductConditionScreenInterface, CONDITION_VALUE, CONDITIONS };
export { ConfirmationScreenInterface, CONFIRMATION_FIELDS, CONFIRMATION };
export {
  ProductDescriptionScreenInterface,
  PRODUCT_DESCRIPTION_FIELDS,
  PRODUCT_DESCRIPTION,
};

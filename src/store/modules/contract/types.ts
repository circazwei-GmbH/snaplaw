import { BaseAction } from "../auth/types";
import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
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
  PaymentScreenInterface,
  PAYMENT_METHODS,
  PAYMENT_FIELDS,
} from "./purchase/payment";
import {
  ProductDescriptionScreenInterface,
  PRODUCT_DESCRIPTION_FIELDS,
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
  payload: CONTRACT_SCREEN_TYPES;
}

export interface ScreenValidateAction extends BaseAction {
  payload: {
    contractType: CONTRACT_TYPES;
    screenType: CONTRACT_SCREEN_TYPES;
  };
}

export interface RequestContractListAction extends BaseAction {
  payload: CONTRACT_LIST_STATE;
}

export enum CONTRACT_LIST_STATE {
  FINALIZED = "finalized",
  IN_PROGRESS = "in_progress",
}

export type ContractDataType = {
  id: string;
  type: CONTRACT_TYPES;
  createdAt: string;
  contractor: string | undefined;
  screens: Array<BaseScreenDataInterface>;
};

export type ContractDataListType = {
  id: string;
  type: CONTRACT_TYPES;
  createdAt: string;
  title: string | undefined;
  contractor: string | undefined;
};

export type ContractListType = Array<ContractDataListType>;

export interface RequestContractAction extends BaseAction {
  payload: string;
}

export { ProductDataScreenInterface, PRODUCT_DATA_FIELDS };
export { UserDataScreenInterface, USER_DATA_FIELDS };
export { ProductConditionScreenInterface, CONDITION_VALUE, CONDITIONS };
export { ConfirmationScreenInterface, CONFIRMATION_FIELDS, CONFIRMATION };
export { PaymentScreenInterface, PAYMENT_METHODS, PAYMENT_FIELDS };
export { ProductDescriptionScreenInterface, PRODUCT_DESCRIPTION_FIELDS };

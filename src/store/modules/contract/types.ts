import { BaseAction } from "../auth/types";
import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
import {
  PRODUCT_DATA_FIELDS,
  ProductDataScreenInterface,
} from "./purchase/product-data";
import {
  USER_DATA_FIELDS,
  UserDataScreenInterface,
} from "./purchase/user-data";
import {
  CONDITION_VALUE,
  CONDITIONS,
  ProductConditionScreenInterface,
} from "./purchase/product-condition";
import {
  CONFIRMATION,
  CONFIRMATION_FIELDS,
  ConfirmationScreenInterface,
} from "./purchase/confirmation";
import {
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
  PaymentScreenInterface,
} from "./purchase/payment";
import {
  PRODUCT_DESCRIPTION_FIELDS,
  ProductDescriptionScreenInterface,
} from "./purchase/product-description";
import { BaseScreenDataInterface } from "./base-types";
import { CONTRACT_ROLE } from "./contract-roles";
import { MediaType } from "../../../services/media";

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
  additionalPayload: {
    isDropSign: boolean;
  };
}

export interface ScreenValidateAction extends BaseAction {
  payload: {
    contractType: CONTRACT_TYPES;
    screenType: CONTRACT_SCREEN_TYPES;
  };
}

export interface RequestContractListAction extends BaseAction {
  payload: {
    type: CONTRACT_LIST_STATE;
    isRefresh: boolean;
  };
}

export enum CONTRACT_LIST_STATE {
  FINALIZED = "finalized",
  IN_PROGRESS = "in_progress",
}

export type ContractDataType = {
  id: string;
  type: CONTRACT_TYPES;
  createdAt: string;
  screens: Array<BaseScreenDataInterface>;
  sign: MediaType | undefined;
  partnerId: string | undefined;
  partnerName: string | null;
  meRole: CONTRACT_ROLE;
  oponentSign: string | null;
};

export type ContractDataListType = {
  id: string;
  type: CONTRACT_TYPES;
  createdAt: string;
  title: string | undefined;
  partnerId: string | undefined;
  meRole: CONTRACT_ROLE;
};

export enum CONTRACT_STATUS {
  WITHOUT_PARTNER = "WITHOUT_PARTNER",
  WITH_PARTNER = "WITH_PARTNER",
  FINNALIZED = "FINNALIZED",
}

export type ContractListType = Array<ContractDataListType>;

export interface RequestContractAction extends BaseAction {
  payload: string;
}

export interface ValidateAllScreensAction extends BaseAction {
  payload: CONTRACT_TYPES;
}

export interface SignContractAction extends BaseAction {
  payload: MediaType;
}

export interface InviteUserInterface {
  contractId?: string;
  search: string;
}

export interface EmailsListItemInterface {
  _id: string;
}

export interface InviteUserAction extends BaseAction {
  payload: InviteUserInterface;
}

export interface RequestGetEmailsInterface {
  payload: string;
  page: string;
}

export interface RequestGetEmailsAction extends BaseAction {
  payload: string;
}

export interface RequestAcceptInviteAction extends BaseAction {
  payload: string;
}

export interface RequestDeleteContractPartnerAction extends BaseAction {
  payload: string;
}

export { ProductDataScreenInterface, PRODUCT_DATA_FIELDS };
export { UserDataScreenInterface, USER_DATA_FIELDS };
export { ProductConditionScreenInterface, CONDITION_VALUE, CONDITIONS };
export { ConfirmationScreenInterface, CONFIRMATION_FIELDS, CONFIRMATION };
export { PaymentScreenInterface, PAYMENT_METHODS, PAYMENT_FIELDS };
export { ProductDescriptionScreenInterface, PRODUCT_DESCRIPTION_FIELDS };

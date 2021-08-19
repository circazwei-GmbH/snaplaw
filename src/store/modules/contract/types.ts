import { BaseAction } from "../auth/types";
import { CONTRACT_TYPES } from "./constants";
import {ProductDataScreenInterface, PRODUCT_DATA_FIELDS} from "./purchase/product-data";
import {UserDataScreenInterface, USER_DATA_FIELDS} from "./purchase/user-data";

export type ContractType = CONTRACT_TYPES.PURCHASE;

export interface RequestCreateContractAction extends BaseAction {
  payload: CONTRACT_TYPES;
}



export type ScreenDataType =
  | UserDataScreenInterface
  | ProductDataScreenInterface;

export interface Contract {
  id: string;
  type: CONTRACT_TYPES;
  screens: Array<ScreenDataType>;
}

export interface RequestScreenDataAction extends BaseAction {
  payload: number;
}

export { ProductDataScreenInterface, PRODUCT_DATA_FIELDS }
export { UserDataScreenInterface, USER_DATA_FIELDS }

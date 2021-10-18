import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";

export enum SELLER_TYPE_VALUE {
  COMMERCIAL = "COMMERCIAL",
  PRIVAT = "PRIVAT",
}

export const SELLER_TYPE_FIELD_NAME = "sellerType";

export interface SellerTypeScreenInterface
  extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.SELLER_TYPE;
  data: {
    [SELLER_TYPE_FIELD_NAME]: SELLER_TYPE_VALUE;
  };
}

export const SELLER_TYPES: Array<SELLER_TYPE_VALUE> = [
  SELLER_TYPE_VALUE.COMMERCIAL,
  SELLER_TYPE_VALUE.PRIVAT,
];

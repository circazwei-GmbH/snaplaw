import { CONTRACT_SCREEN_TYPES } from "./constants";
import { BaseScreenDataInterface } from "./base-types";
import { CURRENCY } from "./payment";

export const enum DEPOSIT_FIELDS {
  DEPOSIT = "deposit",
  COST = "cost",
  DATE = "date",
  CURRENCY = "currency",
}

export const enum DEPOSIT_TYPES {
  TWO_MONTH = "twoMonth",
  THREE_MONTH = "threeMonth",
  OTHER = "other",
}

export interface DepositScreenInterface
  extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT;
  data: {
    [DEPOSIT_FIELDS.DEPOSIT]: DEPOSIT_TYPES;
    [DEPOSIT_FIELDS.COST]: string;
    [DEPOSIT_FIELDS.DATE]: string;
    [DEPOSIT_FIELDS.CURRENCY]: CURRENCY;
  };
}


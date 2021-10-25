import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";

export const enum PAYMENT_INFO_FIELDS {
  ACCOUNT_OWNER = "accountOwner",
  ACCOUNT_NUMBER = "accountNumber",
  IBAN = "iban",
  BIC = "bic",
}

export interface PaymentInfoScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PAYMENT_INFO;
  data: {
    [PAYMENT_INFO_FIELDS.ACCOUNT_OWNER]: string;
    [PAYMENT_INFO_FIELDS.ACCOUNT_NUMBER]: string;
    [PAYMENT_INFO_FIELDS.IBAN]: string;
    [PAYMENT_INFO_FIELDS.BIC]: string;
  };
}

export const PAYMENT_INFO_FIELDS_ARR: Array<PAYMENT_INFO_FIELDS> = [
  PAYMENT_INFO_FIELDS.ACCOUNT_OWNER,
  PAYMENT_INFO_FIELDS.ACCOUNT_NUMBER,
  PAYMENT_INFO_FIELDS.IBAN,
  PAYMENT_INFO_FIELDS.BIC,
];

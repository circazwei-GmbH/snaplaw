import { BaseScreenDataInterface } from "./base-types";
import { CONTRACT_SCREEN_TYPES } from "./constants";

export enum CURRENSY {
  EUR = "EUR",
  USD = "USD",
}

export interface CurrencyInterface {
  value: CURRENSY;
  label: CURRENSY;
}

export enum PAYMENT_METHODS {
  CASH = "CASH",
  PAYPAL = "PAYPAL",
  TRANSFER = "TRANSFER",
  CASH_ADVANCE = "CASH_ADVANCE",
  ALL = "ALL"
}
 
export enum PAYMENT_FIELDS {
  COST = "price",
  CURRENCY = "currency",
  PAYMENT_METHOD = "paymentMethod",
  PAYMENT_DATE = "paymentDate",
  DUE_DATE = "dueDate",
  ADVANCE_DATE = "advanceDate",
  ADVANCE_COST = "advanceCost",
  LEFT_SUM = "leftSum",
  ADVANCE_COSTCARD_NAME = "cardHolderName",
  CARD_NUMBER = "cardNumber",
  SELLER_PAYMENT_METHOD = "sellerPaymentMethod",
  CARD_NAME = "cardName",
}

export interface PaymentScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PAYMENT;
  data: {
    [PAYMENT_FIELDS.COST]: string;
    [PAYMENT_FIELDS.CURRENCY]: CURRENSY;
    [PAYMENT_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS;
    [PAYMENT_FIELDS.SELLER_PAYMENT_METHOD]: PAYMENT_METHODS;
    [PAYMENT_FIELDS.CARD_NAME]: string | undefined;
    [PAYMENT_FIELDS.CARD_NUMBER]: string | undefined;
    [PAYMENT_FIELDS.PAYMENT_DATE]: string | undefined;
    [PAYMENT_FIELDS.DUE_DATE]: string | undefined;
    [PAYMENT_FIELDS.ADVANCE_DATE]: string | undefined;
    [PAYMENT_FIELDS.ADVANCE_COST]: string | undefined;
    [PAYMENT_FIELDS.LEFT_SUM]: string | undefined;
  };
}

export const CURRENCIES: CurrencyInterface[] = [
  {
    label: CURRENSY.EUR,
    value: CURRENSY.EUR,
  },
  {
    label: CURRENSY.USD,
    value: CURRENSY.USD,
  },
];

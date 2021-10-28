import { BaseScreenDataInterface } from "./base-types";
import { CONTRACT_SCREEN_TYPES } from "./constants";

export enum CURRENCY {
  EUR = "EUR",
  USD = "USD",
}

export interface CurrencyInterface {
  value: CURRENCY;
  label: CURRENCY;
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
  FIRST_DATE = "advanceDate",
  ADVANCE_COST = "advanceCost",
  SECOND_DATE = "leftSum",
  CARD_NUMBER = "cardNumber",
  SELLER_PAYMENT_METHOD = "sellerPaymentMethod",
  CARD_NAME = "cardHolderName",
}

export interface PaymentScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PAYMENT;
  data: {
    [PAYMENT_FIELDS.COST]: string;
    [PAYMENT_FIELDS.CURRENCY]: CURRENCY;
    [PAYMENT_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS;
    [PAYMENT_FIELDS.SELLER_PAYMENT_METHOD]: PAYMENT_METHODS;
    [PAYMENT_FIELDS.CARD_NAME]: string | undefined;
    [PAYMENT_FIELDS.CARD_NUMBER]: string | undefined;
    [PAYMENT_FIELDS.PAYMENT_DATE]: string | undefined;
    [PAYMENT_FIELDS.DUE_DATE]: string | undefined;
    [PAYMENT_FIELDS.FIRST_DATE]: string | undefined;
    [PAYMENT_FIELDS.ADVANCE_COST]: string | undefined;
    [PAYMENT_FIELDS.SECOND_DATE]: string | undefined;
  };
}

export const CURRENCIES: CurrencyInterface[] = [
  {
    label: CURRENCY.EUR,
    value: CURRENCY.EUR,
  },
  {
    label: CURRENCY.USD,
    value: CURRENCY.USD,
  },
];

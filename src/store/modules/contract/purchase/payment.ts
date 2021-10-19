import { BaseScreenDataInterface } from "../base-types";
import { CONTRACT_SCREEN_TYPES } from "../constants";

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
  CARD_NAME = "cardHolderName",
  CARD_NUMBER = "cardNumber",
  SELLER_PAYMENT_METHOD = "sellerPaymentMethod",
}

export interface PaymentScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PAYMENT;
  data: {
    [PAYMENT_FIELDS.COST]: string;
    [PAYMENT_FIELDS.CURRENCY]: CURRENSY;
    [PAYMENT_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS;
    [PAYMENT_FIELDS.CARD_NAME]: string | undefined;
    [PAYMENT_FIELDS.CARD_NUMBER]: string | undefined;
    [PAYMENT_FIELDS.SELLER_PAYMENT_METHOD]: PAYMENT_METHODS;
  };
}

export const CURRENSIES: CurrencyInterface[] = [
  {
    label: CURRENSY.EUR,
    value: CURRENSY.EUR,
  },
  {
    label: CURRENSY.USD,
    value: CURRENSY.USD,
  },
];

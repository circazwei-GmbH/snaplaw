import {BaseScreenDataInterface} from "../base-types";
import {CONTRACT_SCREEN_TYPES} from "../constants";

export enum PAYMENT_METHODS {
    CASH = 'CASH',
    PAYPAL = 'PAYPAL',
    TRANSFER = 'TRANSFER'
}

export enum PAYMENT_FIELDS {
    COST = 'COST',
    PAYMENT_METHOD = 'PAYMENT_METHOD',
    CARD_NAME = 'CARD_NAME',
    CARD_NUMBER = 'CARD_NUMBER'
}

export interface PaymentScreenInterface extends BaseScreenDataInterface{
    type: CONTRACT_SCREEN_TYPES.PAYMENT,
    data: {
        [PAYMENT_FIELDS.COST]: string,
        [PAYMENT_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS,
        [PAYMENT_FIELDS.CARD_NAME]: string | undefined,
        [PAYMENT_FIELDS.CARD_NUMBER]: string | undefined
    }
}
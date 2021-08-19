import {CONTRACT_SCREEN_TYPES} from "../constants";

export const enum PRODUCT_DATA_FIELDS {
    subject = "subject",
    producer = "producer",
    description = "description",
    serial = "serial",
}

export interface ProductDataScreenInterface {
    type: CONTRACT_SCREEN_TYPES.PRODUCT_DATA;
    data: {
        [PRODUCT_DATA_FIELDS.subject]: string;
        [PRODUCT_DATA_FIELDS.producer]: string;
        [PRODUCT_DATA_FIELDS.description]: string;
        [PRODUCT_DATA_FIELDS.serial]: string;
    };
}
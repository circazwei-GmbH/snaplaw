import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";

export const enum PRODUCT_DATA_FIELDS {
  subject = "subjectOfSale",
  producer = "producer",
  description = "typeDesignation",
  serial = "serialNumber",
  isSerial = "isSerial",
}

export interface ProductDataScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PRODUCT_DATA;
  data: {
    [PRODUCT_DATA_FIELDS.subject]: string;
    [PRODUCT_DATA_FIELDS.producer]: string;
    [PRODUCT_DATA_FIELDS.description]: string;
    [PRODUCT_DATA_FIELDS.serial]: string;
    [PRODUCT_DATA_FIELDS.isSerial]: boolean;
  };
}

import { CONTRACT_SCREEN_TYPES } from "./constants";
import { BaseScreenDataInterface } from "./base-types";

export const enum PASSPORT_DATA_FIELDS {
  idCard = "idCard",
  identificationCode = "identificationCode",
}

export interface PassportDataScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PASSPORT_DATA;
  data: {
    [PASSPORT_DATA_FIELDS.idCard]: string;
    [PASSPORT_DATA_FIELDS.identificationCode]: string;
  };
}

export const PASSPORT_DATA_FIELDS_ARR: Array<PASSPORT_DATA_FIELDS> = [
  PASSPORT_DATA_FIELDS.idCard,
  PASSPORT_DATA_FIELDS.identificationCode,
];

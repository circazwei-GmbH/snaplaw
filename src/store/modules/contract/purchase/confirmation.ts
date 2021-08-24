import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";

export enum CONFIRMATION_FIELDS {
  FIRST = "FIRST",
  SECOND = "SECOND",
}

export interface ConfirmationScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.CONFIRMATION;
  data: {
    [CONFIRMATION_FIELDS.FIRST]: boolean;
    [CONFIRMATION_FIELDS.SECOND]: boolean;
  };
}

export const CONFIRMATION: Array<CONFIRMATION_FIELDS> = [
  CONFIRMATION_FIELDS.FIRST,
  CONFIRMATION_FIELDS.SECOND,
];

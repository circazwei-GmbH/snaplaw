import { BaseScreenDataInterface } from "../base-types";
import { CONTRACT_SCREEN_TYPES } from "../constants";

export enum SIGN_FIELDS {
  SIGN = "signature",
}

export interface SignScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.SIGN;
  data: {
    [SIGN_FIELDS.SIGN]: string;
  };
}

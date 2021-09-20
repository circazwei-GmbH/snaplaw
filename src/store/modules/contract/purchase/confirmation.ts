import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";
import { CONTRACT_ROLE } from "../contract-roles";

export enum CONFIRMATION_FIELDS {
  FIRST = "FIRST",
  SECOND = "SECOND",
  SELLER_DETAIL = "SELLER_DETAIL",
}

export interface ConfirmationScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.CONFIRMATION;
  data: {
    [CONFIRMATION_FIELDS.FIRST]: boolean;
    [CONFIRMATION_FIELDS.SECOND]: boolean;
    [CONFIRMATION_FIELDS.SELLER_DETAIL]: boolean;
  };
}

export const CONFIRMATION: Record<CONFIRMATION_FIELDS, Array<CONTRACT_ROLE>> = {
  [CONFIRMATION_FIELDS.FIRST]: [CONTRACT_ROLE.OWNER],
  [CONFIRMATION_FIELDS.SECOND]: [CONTRACT_ROLE.OWNER],
  [CONFIRMATION_FIELDS.SELLER_DETAIL]: [CONTRACT_ROLE.PARTNER],
};

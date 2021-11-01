import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";
import { CONTRACT_ROLE } from "../contract-roles";

export enum CONFIRMATION_FIELDS {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
  SELLER_DETAIL = "SELLER_DETAIL",
}

export interface ConfirmationScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.CONFIRMATION;
  data: {
    [CONFIRMATION_FIELDS.FIRST]: boolean;
    [CONFIRMATION_FIELDS.SECOND]: boolean;
    [CONFIRMATION_FIELDS.THIRD]: boolean;
    [CONFIRMATION_FIELDS.SELLER_DETAIL]: boolean;
  };
}

export const CONFIRMATION: Record<
  CONTRACT_TYPES,
  Record<CONFIRMATION_FIELDS, Array<CONTRACT_ROLE>>
> = {
  [CONTRACT_TYPES.PURCHASE]: {
    [CONFIRMATION_FIELDS.FIRST]: [CONTRACT_ROLE.OWNER],
    [CONFIRMATION_FIELDS.SECOND]: [CONTRACT_ROLE.OWNER],
    [CONFIRMATION_FIELDS.SELLER_DETAIL]: [CONTRACT_ROLE.PARTNER],
  },
  [CONTRACT_TYPES.CAR]: {
    [CONFIRMATION_FIELDS.FIRST]: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    [CONFIRMATION_FIELDS.SECOND]: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    [CONFIRMATION_FIELDS.THIRD]: [CONTRACT_ROLE.OWNER],
    [CONFIRMATION_FIELDS.SELLER_DETAIL]: [CONTRACT_ROLE.PARTNER],
  },
  [CONTRACT_TYPES.WORK]: {
    [CONFIRMATION_FIELDS.FIRST]: [CONTRACT_ROLE.OWNER],
    [CONFIRMATION_FIELDS.SELLER_DETAIL]: [CONTRACT_ROLE.PARTNER],
  },
};

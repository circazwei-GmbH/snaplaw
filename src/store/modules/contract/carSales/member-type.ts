import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";

export enum MEMBER_TYPE_VALUE {
  COMMERCIAL = "COMMERCIAL",
  PRIVAT = "PRIVAT",
}

export const MEMBER_TYPE_FIELD_NAME = "memberType";

export interface MemberTypeScreenInterface
  extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.MEMBER_TYPE;
  data: {
    [MEMBER_TYPE_FIELD_NAME]: MEMBER_TYPE_VALUE;
  };
}

export const MEMBER_TYPES: Array<MEMBER_TYPE_VALUE> = [
  MEMBER_TYPE_VALUE.COMMERCIAL,
  MEMBER_TYPE_VALUE.PRIVAT,
];

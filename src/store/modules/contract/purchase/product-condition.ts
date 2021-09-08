import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";

export enum CONDITION_VALUE {
  NEW = "NEW",
  HIGH_QUALITY = "HIGH_QUALITY",
  USED = "USED",
  DEFECTIVE = "DEFECTIVE",
}

export const PRODUCT_CONDITION_FIELD_NAME = "condition";

export interface ProductConditionScreenInterface
  extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION;
  data: {
    [PRODUCT_CONDITION_FIELD_NAME]: CONDITION_VALUE;
  };
}

export const CONDITIONS: Array<CONDITION_VALUE> = [
  CONDITION_VALUE.NEW,
  CONDITION_VALUE.HIGH_QUALITY,
  CONDITION_VALUE.USED,
  CONDITION_VALUE.DEFECTIVE,
];

import { CONTRACT_SCREEN_TYPES } from "./constants";
import { BaseScreenDataInterface } from "./base-types";

export const enum NUMBER_OF_TENANTS_FIELDS {
  NUMBER = "number",
  ANOTHER_PERSON = "anotherPerson",
}

export interface NumberOfTenantsScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS;
  data: {
    [NUMBER_OF_TENANTS_FIELDS.NUMBER]: string;
    [NUMBER_OF_TENANTS_FIELDS.ANOTHER_PERSON]: boolean;
  };
}

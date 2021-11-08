import { BaseScreenDataInterface } from "./base-types";
import { CONTRACT_SCREEN_TYPES } from "./constants";

export const enum RENTAL_PERIOD_FIELDS {
  START = "START",
  MIN_TERM = "MIN_TERM",
  MIN_TERM_DATE = "MIN_TERM_DATE",
  RENTING_LIMITED = "RENTING_LIMITED",
  RENTING_LIMITED_DATE = "RENTING_LIMITED_DATE",
}

export interface RentalPeriodScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.RENTAL_PERIOD;
  data: {
    [RENTAL_PERIOD_FIELDS.START]: string;
    [RENTAL_PERIOD_FIELDS.MIN_TERM]: boolean;
    [RENTAL_PERIOD_FIELDS.MIN_TERM_DATE]: string;
    [RENTAL_PERIOD_FIELDS.RENTING_LIMITED]: boolean;
    [RENTAL_PERIOD_FIELDS.RENTING_LIMITED_DATE]: string;
  };
}

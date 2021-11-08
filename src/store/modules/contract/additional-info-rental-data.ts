import { CONTRACT_SCREEN_TYPES } from "./constants";
import { BaseScreenDataInterface } from "./base-types";

export const enum ADDITIONAL_INFO_RENTAL_FIELDS {
  PETS_ALLOWED = "petsAllowed",
  COSMETIC_REPAIRS = "cosmeticRepairs",
  SMALL_REPAIRS = "smallRepairs",
}

export interface AdditionalInfoRentalScreenInterface
  extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO;
  data: {
    [ADDITIONAL_INFO_RENTAL_FIELDS.PETS_ALLOWED]: boolean;
    [ADDITIONAL_INFO_RENTAL_FIELDS.COSMETIC_REPAIRS]: boolean;
    [ADDITIONAL_INFO_RENTAL_FIELDS.SMALL_REPAIRS]: boolean;
  };
}

export const ADDITIONAL_INFO_RENTAL_FIELDS_ARR: Array<ADDITIONAL_INFO_RENTAL_FIELDS> = [
  ADDITIONAL_INFO_RENTAL_FIELDS.PETS_ALLOWED,
  ADDITIONAL_INFO_RENTAL_FIELDS.COSMETIC_REPAIRS,
  ADDITIONAL_INFO_RENTAL_FIELDS.SMALL_REPAIRS,
];

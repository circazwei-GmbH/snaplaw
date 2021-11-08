import { CONTRACT_SCREEN_TYPES } from "./constants";
import { BaseScreenDataInterface } from "./base-types";
import { MediaType } from "../../../services/media";

export const enum ADDITIONAL_INFO_CAR_FIELDS {
  ACCIDENT_DAMAGE = "accidentDamage",
  ACCIDENT_DAMAGE_DESCRIPTION = "accidentDamageDescription",
  ACCIDENT_DAMAGE_PHOTOS = "accidentDamagePhotos",
  OTHER_DEFECTS = "otherDefects",
  OTHER_DEFECTS_DESCRIPTION = "otherDefectsDescription",
  OTHER_DEFECTS_PHOTOS = "otherDefectsPhotos",
}

export interface AdditionalInfoCarScreenInterface
  extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO;
  data: {
    [ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE]: boolean;
    [ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE_DESCRIPTION]: string;
    [ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE_PHOTOS]: MediaType[];
    [ADDITIONAL_INFO_CAR_FIELDS.OTHER_DEFECTS]: boolean;
    [ADDITIONAL_INFO_CAR_FIELDS.OTHER_DEFECTS_DESCRIPTION]: string;
    [ADDITIONAL_INFO_CAR_FIELDS.OTHER_DEFECTS_PHOTOS]: MediaType[];
  };
}


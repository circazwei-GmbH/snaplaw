import { MediaType } from "../../../services/media";
import { BaseScreenDataInterface } from "./base-types";
import { CONTRACT_SCREEN_TYPES } from "./constants";

export const enum USABLE_SPACES_FIELDS {
  GARAGE = "garage",
  UNDERGROUND_PARKING = "undergroundParking",
  PARKING = "parking",
  CELLAR = "cellar",
  GARDEN = "garden",
  OTHER = "other",
  DESCRIPTION = "description",
  PHOTOS = "photos",
}

export interface UsableSpacesScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS;
  data: {
    [USABLE_SPACES_FIELDS.GARAGE]: boolean;
    [USABLE_SPACES_FIELDS.UNDERGROUND_PARKING]: boolean;
    [USABLE_SPACES_FIELDS.PARKING]: boolean;
    [USABLE_SPACES_FIELDS.CELLAR]: boolean;
    [USABLE_SPACES_FIELDS.GARDEN]: boolean;
    [USABLE_SPACES_FIELDS.OTHER]: boolean;
    [USABLE_SPACES_FIELDS.DESCRIPTION]: string;
    [USABLE_SPACES_FIELDS.PHOTOS]: MediaType[];
  };
}

export const USABLE_SPACES_FIELDS_ARR: Array<USABLE_SPACES_FIELDS> = [
  USABLE_SPACES_FIELDS.GARAGE,
  USABLE_SPACES_FIELDS.UNDERGROUND_PARKING,
  USABLE_SPACES_FIELDS.PARKING,
  USABLE_SPACES_FIELDS.CELLAR,
  USABLE_SPACES_FIELDS.GARDEN,
  USABLE_SPACES_FIELDS.OTHER,
];

import { MediaType } from "../../../services/media";
import { BaseScreenDataInterface } from "./base-types";
import { CONTRACT_SCREEN_TYPES } from "./constants";

export const enum COMMON_ROOMS_FIELDS {
  WASHING = "washing",
  DRYING = "drying",
  SHARED_GARDEN = "sharedGarden",
  OTHER = "other",
  DESCRIPTION = "description",
  PHOTOS = "photos",
}

export interface CommonRoomsScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS;
  data: {
    [COMMON_ROOMS_FIELDS.WASHING]: boolean;
    [COMMON_ROOMS_FIELDS.DRYING]: boolean;
    [COMMON_ROOMS_FIELDS.SHARED_GARDEN]: boolean;
    [COMMON_ROOMS_FIELDS.OTHER]: boolean;
    [COMMON_ROOMS_FIELDS.DESCRIPTION]: string;
    [COMMON_ROOMS_FIELDS.PHOTOS]: MediaType[];
  };
}

export const COMMON_ROOMS_FIELDS_ARR: Array<COMMON_ROOMS_FIELDS> = [
  COMMON_ROOMS_FIELDS.WASHING,
  COMMON_ROOMS_FIELDS.DRYING,
  COMMON_ROOMS_FIELDS.SHARED_GARDEN,
  COMMON_ROOMS_FIELDS.OTHER,
];

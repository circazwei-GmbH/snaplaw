import { CONTRACT_SCREEN_TYPES } from "./constants";
import { BaseScreenDataInterface } from "./base-types";
import { MediaType } from "../../../services/media";

export const enum HOUSING_DATA_FIELDS {
  AREA = "area",
  ROOMS_NUMBER = "roomsNumber",
  LOCATION = "location",
  IS_FURNISHED = "isFurnished",
  FURNISHED_DESCRIPTION = "furnishedDescription",
  FURNISHED_PHOTOS = "furnishedPhotos",
}

export interface HousingDataScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.ABOUT_HOUSING;
  data: {
    [HOUSING_DATA_FIELDS.AREA]: string;
    [HOUSING_DATA_FIELDS.ROOMS_NUMBER]: string;
    [HOUSING_DATA_FIELDS.LOCATION]: string;
    [HOUSING_DATA_FIELDS.IS_FURNISHED]: boolean;
    [HOUSING_DATA_FIELDS.FURNISHED_DESCRIPTION]: string;
    [HOUSING_DATA_FIELDS.FURNISHED_PHOTOS]: MediaType[];
  };
}

export const PASSPORT_DATA_FIELDS_ARR: Array<HOUSING_DATA_FIELDS> = [
  HOUSING_DATA_FIELDS.AREA,
  HOUSING_DATA_FIELDS.ROOMS_NUMBER,
  HOUSING_DATA_FIELDS.LOCATION,
  HOUSING_DATA_FIELDS.IS_FURNISHED,
  HOUSING_DATA_FIELDS.FURNISHED_DESCRIPTION,
  HOUSING_DATA_FIELDS.FURNISHED_PHOTOS,
];

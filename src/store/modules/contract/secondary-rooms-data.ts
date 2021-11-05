import { MediaType } from "../../../services/media";
import { BaseScreenDataInterface } from "./base-types";
import { CONTRACT_SCREEN_TYPES } from "./constants";

export const enum SECONDARY_ROOMS_FIELDS {
  BATHROOM_WC = "bathroomWithWC",
  BATHROOM = "bathroom",
  WC = "wc",
  STOREROOM = "storeroom",
  BALCONY = "balcony",
  TERRACE = "terrace",
  OTHER = "other",
  DESCRIPTION = "description",
  PHOTOS = "photos",
}

export interface SecondaryRoomsScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS;
  data: {
    [SECONDARY_ROOMS_FIELDS.BATHROOM_WC]: boolean;
    [SECONDARY_ROOMS_FIELDS.BATHROOM]: boolean;
    [SECONDARY_ROOMS_FIELDS.WC]: boolean;
    [SECONDARY_ROOMS_FIELDS.STOREROOM]: boolean;
    [SECONDARY_ROOMS_FIELDS.BALCONY]: boolean;
    [SECONDARY_ROOMS_FIELDS.TERRACE]: boolean;
    [SECONDARY_ROOMS_FIELDS.OTHER]: boolean;
    [SECONDARY_ROOMS_FIELDS.DESCRIPTION]: string;
    [SECONDARY_ROOMS_FIELDS.PHOTOS]: MediaType[];
  };
}

export const SECONDARY_ROOMS_FIELDS_ARR: Array<SECONDARY_ROOMS_FIELDS> = [
  SECONDARY_ROOMS_FIELDS.BATHROOM_WC,
  SECONDARY_ROOMS_FIELDS.BATHROOM,
  SECONDARY_ROOMS_FIELDS.WC,
  SECONDARY_ROOMS_FIELDS.STOREROOM,
  SECONDARY_ROOMS_FIELDS.BALCONY,
  SECONDARY_ROOMS_FIELDS.TERRACE,
  SECONDARY_ROOMS_FIELDS.OTHER,
];

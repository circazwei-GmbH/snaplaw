import { MediaType } from "../../../services/media";
import { BaseScreenDataInterface } from "./base-types";
import { CONTRACT_SCREEN_TYPES } from "./constants";

export const enum DIRECT_SUPPLY_FIELDS {
  ELECTRICITY = "electricity",
  WATER = "water",
  HEATING = "heating",
  HEATING_OIL = "heatingOil",
  GAS = "gas",
  TELEPHONE = "telephone",
  INTERNET = "internet",
  GARBAGE_COLLECTION = "garbageCollection",
  ALARM = "alarm",
  OTHER = "other",
  DESCRIPTION = "description",
  PHOTOS = "photos"
}

export interface DirectSupplyScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS;
  data: {
    [DIRECT_SUPPLY_FIELDS.ELECTRICITY]: boolean;
    [DIRECT_SUPPLY_FIELDS.WATER]: boolean;
    [DIRECT_SUPPLY_FIELDS.HEATING]: boolean;
    [DIRECT_SUPPLY_FIELDS.HEATING_OIL]: boolean;
    [DIRECT_SUPPLY_FIELDS.GAS]: boolean;
    [DIRECT_SUPPLY_FIELDS.TELEPHONE]: boolean;
    [DIRECT_SUPPLY_FIELDS.INTERNET]: boolean;
    [DIRECT_SUPPLY_FIELDS.GARBAGE_COLLECTION]: boolean;
    [DIRECT_SUPPLY_FIELDS.ALARM]: boolean;
    [DIRECT_SUPPLY_FIELDS.OTHER]: boolean;
    [DIRECT_SUPPLY_FIELDS.DESCRIPTION]: string;
    [DIRECT_SUPPLY_FIELDS.PHOTOS]: MediaType[];
  };
}

export const DIRECT_SUPPLY_FIELDS_ARR: Array<DIRECT_SUPPLY_FIELDS> = [
  DIRECT_SUPPLY_FIELDS.ELECTRICITY,
  DIRECT_SUPPLY_FIELDS.WATER,
  DIRECT_SUPPLY_FIELDS.HEATING,
  DIRECT_SUPPLY_FIELDS.HEATING_OIL,
  DIRECT_SUPPLY_FIELDS.GAS,
  DIRECT_SUPPLY_FIELDS.TELEPHONE,
  DIRECT_SUPPLY_FIELDS.INTERNET,
  DIRECT_SUPPLY_FIELDS.GARBAGE_COLLECTION,
  DIRECT_SUPPLY_FIELDS.ALARM,
  DIRECT_SUPPLY_FIELDS.OTHER,
];

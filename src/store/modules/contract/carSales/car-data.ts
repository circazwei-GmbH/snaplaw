import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";

export const enum CAR_DATA_FIELDS {
  producer = "producer",
  model = "model",
  type = "type",
  year = "year",
  prevRegistrationNumber = "prevRegistrationNumber",
  serialNumber = "serialNumber",
  run = "run",
}

export interface CarDataScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PASSPORT_DATA;
  data: {
    [CAR_DATA_FIELDS.producer]: string;
    [CAR_DATA_FIELDS.model]: string;
    [CAR_DATA_FIELDS.type]: string;
    [CAR_DATA_FIELDS.year]: string;
    [CAR_DATA_FIELDS.prevRegistrationNumber]: string;
    [CAR_DATA_FIELDS.serialNumber]: string;
    [CAR_DATA_FIELDS.run]: string;
}}

export const CAR_DATA_FIELDS_ARR: Array<CAR_DATA_FIELDS> = [
  CAR_DATA_FIELDS.producer,
  CAR_DATA_FIELDS.model,
  CAR_DATA_FIELDS.type,
  CAR_DATA_FIELDS.year,
  CAR_DATA_FIELDS.prevRegistrationNumber,
  CAR_DATA_FIELDS.serialNumber,
  CAR_DATA_FIELDS.run,
];

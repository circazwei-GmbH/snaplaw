import { CONTRACT_SCREEN_TYPES } from "./constants";
import { BaseScreenDataInterface } from "./base-types";

export const enum SPECIFICATIONS_DATA_FIELDS {
  INSPECTION = "inspection",
  COMMERCIAL = "commercial",
  FOREIGN_MADE = "foreignMade",
  TECHNICAL_WORK = "technicalWork",
  SERVICE = "service",
  DEREGISTERED = "deregistered",
  INSPECTION_DATE = "inspectionDate", 
  DEREGISTERED_DATE = "deregisteredDate",
  FIRST_REGISTRATION = "firstRegistration",
  FIRST_REGISTRATION_DATE = "firstRegistrationDate",
  NUMBER_OF_KEYS_PROVIDED = "numberOfKeysProvided"
}

export interface SpecificationsDataScreenInterface
  extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.SPECIFICATIONS;
  data: {
    [SPECIFICATIONS_DATA_FIELDS.INSPECTION]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.COMMERCIAL]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.FOREIGN_MADE]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.TECHNICAL_WORK]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.SERVICE]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.DEREGISTERED]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.INSPECTION_DATE]: string;
    [SPECIFICATIONS_DATA_FIELDS.DEREGISTERED_DATE]: string;
    [SPECIFICATIONS_DATA_FIELDS.FIRST_REGISTRATION]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.FIRST_REGISTRATION_DATE]: string;
    [SPECIFICATIONS_DATA_FIELDS.NUMBER_OF_KEYS_PROVIDED]: number;
  };
}

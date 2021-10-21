import { CONTRACT_SCREEN_TYPES } from "./constants";
import { BaseScreenDataInterface } from "./base-types";

export const enum SPECIFICATIONS_DATA_FIELDS {
  inspection = "inspection",
  commercial = "commercial",
  foreignMade = "foreignMade",
  technicalWork = "technicalWork",
  service = "service",
  deregistered = "deregistered",
  inspectionDate = "inspectionDate", 
  deregisteredDate = "deregisteredDate", 
}

export interface SpecificationsDataScreenInterface
  extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.SPECIFICATIONS;
  data: {
    [SPECIFICATIONS_DATA_FIELDS.inspection]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.commercial]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.foreignMade]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.technicalWork]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.service]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.deregistered]: boolean;
    [SPECIFICATIONS_DATA_FIELDS.deregisteredDate]: string;
    [SPECIFICATIONS_DATA_FIELDS.inspectionDate]: string;
  };
}

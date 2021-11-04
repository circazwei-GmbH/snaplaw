import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";

export const enum SERVICES_DATA_FIELDS {
  SERVICES_DATA = "servicesData",
  SERVICE_TITLE = "serviceTitle",
  SERVICE_DATE = "serviceDate",
}

export interface ServiceDataInterface {
  [SERVICES_DATA_FIELDS.SERVICE_TITLE]: string;
  [SERVICES_DATA_FIELDS.SERVICE_DATE]: string;
}

export interface ServicesDataScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.SERVICES;
  data: {
    [SERVICES_DATA_FIELDS.SERVICES_DATA]: Array<ServiceDataInterface>;
  };
}

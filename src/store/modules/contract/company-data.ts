import { CONTRACT_SCREEN_TYPES } from "./constants";
import { BaseScreenDataInterface } from "./base-types";

export const enum COMPANY_DATA_FIELDS {
  companyName = "companyName",
  vatId = "vatId",
  email = "email",
  address = "address",
  postCode = "postalCode",
  phone = "phone",
}

export interface CompanyDataScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.COMPANY_DATA;
  data: {
    [COMPANY_DATA_FIELDS.companyName]: string;
    [COMPANY_DATA_FIELDS.vatId]: string;
    [COMPANY_DATA_FIELDS.email]: string;
    [COMPANY_DATA_FIELDS.address]: string;
    [COMPANY_DATA_FIELDS.postCode]: string;
    [COMPANY_DATA_FIELDS.phone]: string;
  };
}

export const COMPANY_DATA_FIELDS_ARR: Array<COMPANY_DATA_FIELDS> = [
  COMPANY_DATA_FIELDS.companyName,
  COMPANY_DATA_FIELDS.vatId,
  COMPANY_DATA_FIELDS.email,
  COMPANY_DATA_FIELDS.address,
  COMPANY_DATA_FIELDS.postCode,
  COMPANY_DATA_FIELDS.phone,
];

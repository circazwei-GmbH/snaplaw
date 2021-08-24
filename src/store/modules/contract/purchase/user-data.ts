import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";

export const enum USER_DATA_FIELDS {
  name = "name",
  lastName = "lastName",
  dateOfBirth = "dateOfBirth",
  email = "email",
  phone = "phone",
  address = "address",
  postCode = "postCode",
}

export interface UserDataScreenInterface extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.USER_DATA;
  data: {
    [USER_DATA_FIELDS.name]: string;
    [USER_DATA_FIELDS.lastName]: string;
    [USER_DATA_FIELDS.dateOfBirth]: string;
    [USER_DATA_FIELDS.email]: string;
    [USER_DATA_FIELDS.phone]: string;
    [USER_DATA_FIELDS.address]: string;
    [USER_DATA_FIELDS.postCode]: string;
  };
}

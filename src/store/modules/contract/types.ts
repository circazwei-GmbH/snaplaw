import {BaseAction} from "../auth/types";
import {CONTRACT_SCREEN_TYPES, CONTRACT_TYPES} from "./constants";

export type ContractType = CONTRACT_TYPES.PURCHASE

export interface RequestCreateContractAction extends BaseAction {
    payload: CONTRACT_TYPES
}

export type ScreenType = {
    type: CONTRACT_SCREEN_TYPES,
    data: USER_DATA_FIELDS | Record<string, string>
}

export const enum USER_DATA_FIELDS {
    name = 'name',
    lastName = 'lastName',
    dateOfBirth = 'dateOfBirth',
    email = 'email',
    phone = 'phone',
    address = 'address',
    postCode = 'postCode'
}

export interface UserDataScreenInterface {
    type: CONTRACT_SCREEN_TYPES.USER_DATA,
    data: {
        [USER_DATA_FIELDS.name]: string,
        [USER_DATA_FIELDS.lastName]: string,
        [USER_DATA_FIELDS.dateOfBirth]: string,
        [USER_DATA_FIELDS.email]: string,
        [USER_DATA_FIELDS.phone]: string,
        [USER_DATA_FIELDS.address]: string,
        [USER_DATA_FIELDS.postCode]: string
    }
}

export type ScreenDataType = UserDataScreenInterface

export interface Contract {
    id: string,
    type: CONTRACT_TYPES,
    screens: Array<ScreenDataType>
}

export interface RequestScreenDataAction extends BaseAction {
    payload: number
}
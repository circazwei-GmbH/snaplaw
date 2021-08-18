import {BaseAction} from "../auth/types";
import {CONTRACT_SCREEN_TYPES, CONTRACT_TYPES} from "./constants";

export type ContractType = CONTRACT_TYPES.PURCHASE

export interface RequestCreateContractAction extends BaseAction {
    payload: CONTRACT_TYPES
}

export type ScreenType = {
    type: CONTRACT_SCREEN_TYPES,
    data: Record<string, string>
}

export interface UserDataScreenInterface {
    type: CONTRACT_SCREEN_TYPES.USER_DATA,
    data: {
        name: string,
        lastName: string,
        dateOfBirth: string,
        email: string,
        phone: string,
        address: string,
        postCode: string
    }
}

export interface Contract {
    id: string,
    type: CONTRACT_TYPES,
    screens: Array<UserDataScreenInterface | ScreenType>
}
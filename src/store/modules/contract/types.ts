import {BaseAction} from "../auth/types";
import {CONTRACT_TYPES} from "./constants";

export type ContractType = CONTRACT_TYPES.PURCHASE

export interface RequestCreateContractAction extends BaseAction {
    payload: CONTRACT_TYPES
}
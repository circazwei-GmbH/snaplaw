import { BaseAction } from "../auth/types";
import { CONTRACT_TYPES } from "./constants";

export type ContractType = CONTRACT_TYPES.PURCHASE;

export type ProductDataType = {
  subject?: string;
  producer?: string;
  designation?: string;
  serial?: string;
};

export interface RequestCreateContractAction extends BaseAction {
  payload: CONTRACT_TYPES;
}

export interface Contract {
  id: string;
  type: CONTRACT_TYPES;
}

import { RequestCreateContractAction, RequestScreenDataAction } from "./types";
import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
import { contractScreensConfig } from "./contract-screens-types";
import { BaseAction } from "../auth/types";

export const REQUEST_CREATE_CONTRACT = "REQUEST_CREATE_CONTRACT";
export const REQUEST_SCREEN_DATA = "REQUEST_SCREEN_DATA";
export const VALIDATE_SCREEN = "VALIDATE_SCREEN";
export const REQEST_CONTRACTS_LIST = "REQEST_CONTRACTS_LIST";

export const requestCreateContract = (
  type: CONTRACT_TYPES
): RequestCreateContractAction => ({
  type: REQUEST_CREATE_CONTRACT,
  payload: type,
});

export const requestScreenData = (
  contractType: CONTRACT_TYPES,
  screenPosition: number
): RequestScreenDataAction => ({
  type: REQUEST_SCREEN_DATA,
  payload: contractScreensConfig[contractType][screenPosition].type,
});

export const validateScreen = (
  contractType: CONTRACT_TYPES,
  screenType: CONTRACT_SCREEN_TYPES
) => ({
  type: VALIDATE_SCREEN,
  payload: {
    contractType,
    screenType,
  },
});

export const requestContractsList = (): BaseAction => ({
  type: REQEST_CONTRACTS_LIST,
  payload: undefined,
});

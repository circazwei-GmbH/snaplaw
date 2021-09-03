import { RequestCreateContractAction, RequestScreenDataAction } from "./types";
import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";

export const REQUEST_CREATE_CONTRACT = "REQUEST_CREATE_CONTRACT";
export const REQUEST_SCREEN_DATA = "REQUEST_SCREEN_DATA";
export const VALIDATE_SCREEN = "VALIDATE_SCREEN";

export const requestCreateContract = (
  type: CONTRACT_TYPES
): RequestCreateContractAction => ({
  type: REQUEST_CREATE_CONTRACT,
  payload: type,
});

export const requestScreenData = (
  screenPosition: number
): RequestScreenDataAction => ({
  type: REQUEST_SCREEN_DATA,
  payload: screenPosition,
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

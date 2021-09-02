import { RequestCreateContractAction, RequestScreenDataAction } from "./types";
import { CONTRACT_TYPES } from "./constants";

export const REQUEST_CREATE_CONTRACT = "REQUEST_CREATE_CONTRACT";
export const REQUEST_SCREEN_DATA = "REQUEST_SCREEN_DATA";
export const REQUEST_USERS_EMAIL = "REQUEST_USERS_EMAIL";

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

export const requestUsersEmail = () => ({
  type: REQUEST_USERS_EMAIL,
});

import {
  CONTRACT_LIST_STATE,
  RequestContractAction,
  RequestContractListAction,
  RequestCreateContractAction,
  RequestScreenDataAction,
  SignContractAction,
  ValidateAllScreensAction,
} from "./types";
import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
import { getTypeByContractAndScreen } from "./helper";

export const REQUEST_CREATE_CONTRACT = "REQUEST_CREATE_CONTRACT";
export const REQUEST_SCREEN_DATA = "REQUEST_SCREEN_DATA";
export const VALIDATE_SCREEN = "VALIDATE_SCREEN";
export const VALIDATE_ALL_SCREENS = "VALIDATE_ALL_SCREENS";
export const REQEST_CONTRACTS_LIST = "REQEST_CONTRACTS_LIST";
export const REQUEST_CONTRACT = "REQUEST_CONTRACT";
export const REQUEST_CONTRACT_DELETE = "REQUEST_CONTRACT_DELETE";
export const SIGN_CONTRACT = "SIGN_CONTRACT";

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
  payload: getTypeByContractAndScreen(contractType, screenPosition),
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

export const validateAllScreens = (
  contractType: CONTRACT_TYPES
): ValidateAllScreensAction => ({
  type: VALIDATE_ALL_SCREENS,
  payload: contractType,
});

export const requestContractsList = (
  type: CONTRACT_LIST_STATE,
  isRefresh?: boolean
): RequestContractListAction => ({
  type: REQEST_CONTRACTS_LIST,
  payload: {
    type,
    isRefresh: !!isRefresh
  },
});

export const requestContract = (id: string): RequestContractAction => ({
  type: REQUEST_CONTRACT,
  payload: id,
});

export const requestDeleteContract = (id: string): RequestContractAction => ({
  type: REQUEST_CONTRACT_DELETE,
  payload: id,
});

export const signContract = (filePath: string): SignContractAction => ({
  type: SIGN_CONTRACT,
  payload: filePath,
});

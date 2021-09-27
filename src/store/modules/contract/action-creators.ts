import {
  CONTRACT_LIST_STATE,
  RequestContractAction,
  RequestContractListAction,
  RequestCreateContractAction,
  RequestScreenDataAction,
  SignContractAction,
  ValidateAllScreensAction,
  InviteUserAction,
  RequestGetEmailsAction,
  RequestAcceptInviteAction, RequestDeleteContractPartnerAction,
} from "./types";
import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";

export const REQUEST_CREATE_CONTRACT = "REQUEST_CREATE_CONTRACT";
export const REQUEST_SCREEN_DATA = "REQUEST_SCREEN_DATA";
export const VALIDATE_SCREEN = "VALIDATE_SCREEN";
export const VALIDATE_ALL_SCREENS = "VALIDATE_ALL_SCREENS";
export const REQEST_CONTRACTS_LIST = "REQEST_CONTRACTS_LIST";
export const REQUEST_CONTRACT = "REQUEST_CONTRACT";
export const REQUEST_CONTRACT_DELETE = "REQUEST_CONTRACT_DELETE";
export const SIGN_CONTRACT = "SIGN_CONTRACT";
export const REQUEST_INVITE_USER = "REQUEST_INVITE_USER";
export const REQUEST_USERS_EMAIL = "REQUEST_USERS_EMAIL";
export const REQUEST_ACCEPT_INVITE = "REQUEST_ACCEPT_INVITE";
export const REQUEST_DELETE_CONTRACT_PARTNER = "REQUEST_DELETE_CONTRACT_PARTNER";
export const REQUEST_CONTRACT_DETAIL_FOR_PDF = "REQUEST_CONTRACT_DETAIL_FOR_PDF";
export const REQUEST_LEAVE_CONTRACT = "REQUEST_LEAVE_CONTRACT";

export const requestCreateContract = (
  type: CONTRACT_TYPES
): RequestCreateContractAction => ({
  type: REQUEST_CREATE_CONTRACT,
  payload: type,
});

export const requestScreenData = (
  contractType: CONTRACT_TYPES,
  screenType: CONTRACT_SCREEN_TYPES
): RequestScreenDataAction => ({
  type: REQUEST_SCREEN_DATA,
  payload: screenType,
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
    isRefresh: !!isRefresh,
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

export const requestInviteUser = (
  search: string,
  contractId?: string
): InviteUserAction => ({
  type: REQUEST_INVITE_USER,
  payload: {
    contractId,
    search,
  },
});

export const requestUsersEmail = (search: string): RequestGetEmailsAction => ({
  type: REQUEST_USERS_EMAIL,
  payload: search,
});

export const requestAcceptInvite = (id: string): RequestAcceptInviteAction => ({
  type: REQUEST_ACCEPT_INVITE,
  payload: id,
});

export const requestDeleteContractPartner = (contractId: string): RequestDeleteContractPartnerAction => ({
  type: REQUEST_DELETE_CONTRACT_PARTNER,
  payload: contractId
})

export const requestContractDetailForPdfView = (contractId: string): RequestContractAction => ({
  type: REQUEST_CONTRACT_DETAIL_FOR_PDF,
  payload: contractId
})

export const requestLeaveContract = (contractId: string): RequestContractAction => ({
  type: REQUEST_LEAVE_CONTRACT,
  payload: contractId
})

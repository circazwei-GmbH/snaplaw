import {
  RequestCreateContractAction,
  RequestScreenDataAction,
  InviteUserAction,
  InviteUserInterface,
  RequestGetEmailsAction,
  RequestGetEmailsInterface,
} from "./types";
import { CONTRACT_TYPES } from "./constants";

export const REQUEST_CREATE_CONTRACT = "REQUEST_CREATE_CONTRACT";
export const REQUEST_SCREEN_DATA = "REQUEST_SCREEN_DATA";
export const REQUEST_INVITE_USER = "REQUEST_INVITE_USER";
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

export const requestInviteUser = (
  inviteData: InviteUserInterface
): InviteUserAction => ({
  type: REQUEST_INVITE_USER,
  payload: inviteData,
});

export const requestUsersEmail = (
  getEmailData: RequestGetEmailsInterface
): RequestGetEmailsAction => ({
  type: REQUEST_USERS_EMAIL,
  payload: getEmailData,
});

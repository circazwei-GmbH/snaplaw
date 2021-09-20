import { CONTRACT_TYPES } from "../../store/modules/contract/constants";
import httpClient from "../api";
import { BaseScreenDataInterface } from "../../store/modules/contract/base-types";
import {
  InviteUserInterface,
  RequestGetEmailsInterface,
} from "../../store/modules/contract/types";
import { API_HOST } from "../../env/env";
import { LanguageType } from "../../store/modules/profile/slice";
import { LANGUAGE_GERMANY } from "../../store/modules/profile/constants";
import {
  CONTRACT_LIST_STATE,
  ContractDataType,
} from "../../store/modules/contract/types";
import { translateContract, translateContractList } from "./prepare-translator";
import { getUserFromToken } from "../../utils";
import { screenDataTranslator } from "./post-translator";
import { CONTRACT_ROLE } from "../../store/modules/contract/contract-roles";

const createContract = (type: CONTRACT_TYPES) =>
  httpClient.post("api/contracts", { type });

const saveScreenData = (
  id: string,
  screen: BaseScreenDataInterface,
  meRole: CONTRACT_ROLE
) =>
  httpClient.put(`api/contracts/${id}`, screenDataTranslator(screen, meRole));

const inviteUser = (contractData: InviteUserInterface): Promise<any> => {
  return httpClient.post(
    `api/contracts/${contractData.contractId}/invite-user`,
    {
      email: contractData.search,
      locale: LANGUAGE_GERMANY ? "de" : "en",
    }
  );
};

const getUserEmails = async (
  searchData: RequestGetEmailsInterface
): Promise<any> => {
  const response = await httpClient.get(
    `api/contracts/invited-emails?search=${searchData.payload ?? ""}&page=${
      searchData.page ?? 0
    }`
  );
  return response.data;
};

const requestContractList = async (type: CONTRACT_LIST_STATE, page: number) => {
  const response = await httpClient.get(
    `api/contracts?type=${type}&page=${page}&limit=10`
  );
  const token = httpClient.getToken();
  return translateContractList(
    response.data,
    getUserFromToken(token || "")?._id
  );
};

const requestContract = async (id: string): Promise<ContractDataType> => {
  const response = await httpClient.get(`api/contracts/${id}`);
  const token = httpClient.getToken();
  return translateContract(response.data, getUserFromToken(token || "")?._id);
};

const requestDeleteContract = (id: string) =>
  httpClient.delete(`api/contracts/${id}`);

const signContract = (id: string, path: string) =>
  httpClient.patch(`api/contracts/${id}/sign`, { path });

const acceptInvite = (id: string) =>
  httpClient.patch(`api/contracts/${id}/invite-accept`, {});

export const buildPDFSource = (
  id: string,
  locale: LanguageType | undefined
) => {
  return {
    uri: `${API_HOST}/api/contracts/${id}/${
      locale === LANGUAGE_GERMANY ? "de" : "en"
    }/pdf`,
    headers: {
      Authorization: `Bearer ${httpClient.getToken()}`,
    },
  };
};

export default {
  createContract,
  saveScreenData,
  inviteUser,
  getUserEmails,
  requestContractList,
  requestContract,
  requestDeleteContract,
  signContract,
  acceptInvite,
};

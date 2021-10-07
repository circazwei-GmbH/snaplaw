import { CONTRACT_TYPES } from "../../store/modules/contract/constants";
import httpClient from "../api";
import { BaseScreenDataInterface } from "../../store/modules/contract/base-types";
import {
  InviteUserInterface,
  RequestGetEmailsInterface,
  SmartFiltersType,
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
import { MediaType } from "../media";

const createContract = (type: CONTRACT_TYPES) =>
  httpClient.post("api/contracts", { type });

const saveScreenData = (
  id: string,
  screen: BaseScreenDataInterface,
  meRole: CONTRACT_ROLE,
  isDropSign: boolean = false
) =>
  httpClient.put(`api/contracts/${id}`, {
    ...screenDataTranslator(screen, meRole),
    isDropSign,
  });

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

const requestContractList = async (type: CONTRACT_LIST_STATE, page: number, filters: SmartFiltersType) => {
  let url = `api/contracts?type=${type}&page=${page}&limit=10&contracts_types=${JSON.stringify(filters.types)}`
  
  if (filters.date) {
    const convertDate = new Date(filters.date);
    convertDate.setHours(0);
    convertDate.setMinutes(0);
    convertDate.setSeconds(0);
    url += `&date=${convertDate.getTime()}`
  }
  
  const response = await httpClient.get(url);
  
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

const signContract = (id: string, path: MediaType) =>
  httpClient.patch(`api/contracts/${id}/sign`, { path });

const acceptInvite = (id: string) =>
  httpClient.patch(`api/contracts/${id}/invite-accept`, {});

const deleteContractPartner = (id: string) =>
  httpClient.patch(`api/contracts/${id}/delete-partner`, {});

const requestLeaveContract = (id: string) =>
  httpClient.patch(`api/contracts/${id}/leave`, {});

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
  deleteContractPartner,
  requestLeaveContract,
};

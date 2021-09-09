import { CONTRACT_TYPES } from "../../store/modules/contract/constants";
import httpClient from "../api";
import { BaseScreenDataInterface } from "../../store/modules/contract/base-types";
import { API_HOST } from "../../env/env";
import { LanguageType } from "../../store/modules/profile/slice";
import { LANGUAGE_GERMANY } from "../../store/modules/profile/constants";
import {
  CONTRACT_LIST_STATE,
  ContractDataType,
} from "../../store/modules/contract/types";
import { translateContract, translateContractList } from "./translator";

const createContract = (type: CONTRACT_TYPES) =>
  httpClient.post("api/contracts", { type });

const saveScreenData = (id: string, screen: BaseScreenDataInterface) =>
  httpClient.put(`api/contracts/${id}`, {
    ...screen.data,
    screenType: screen.type,
  });

const requestContractList = async (type: CONTRACT_LIST_STATE, page: number) => {
  const response = await httpClient.get(
    `api/contracts?type=${type}&page=${page}&limit=10`
  );
  return translateContractList(response.data);
};

const requestContract = async (id: string): Promise<ContractDataType> => {
  const response = await httpClient.get(`api/contracts/${id}`);
  return translateContract(response.data);
};

const requestDeleteContract = (id: string) =>
  httpClient.delete(`api/contracts/${id}`);

const signContract = (id: string, path: string) =>
  httpClient.patch(`api/contracts/${id}/sign`, { path });

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
  requestContractList,
  requestContract,
  requestDeleteContract,
  signContract,
};

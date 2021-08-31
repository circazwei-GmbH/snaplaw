import { CONTRACT_TYPES } from "../../store/modules/contract/constants";
import httpClient from "../api";
import { BaseScreenDataInterface } from "../../store/modules/contract/base-types";
import {API_HOST} from "../../env/env";
import {LanguageType} from "../../store/modules/profile/slice";
import {LANGUAGE_GERMANY} from "../../store/modules/profile/constants";

const createContract = (type: CONTRACT_TYPES) =>
  httpClient.post("api/contracts", { type });

const saveScreenData = (id: string, screen: BaseScreenDataInterface) =>
  httpClient.put(`api/contracts/${id}`, {
    ...screen.data,
    screenType: screen.type,
  });

export const buildPDFSource = (id: string, locale: LanguageType | undefined) => ({
  uri: `${API_HOST}/api/contracts/${id}/${locale === LANGUAGE_GERMANY ? 'de' : 'en'}/pdf`,
  headers: {
    Authorization: `Bearer ${httpClient.getToken()}`
  }
})

export default {
  createContract,
  saveScreenData
};

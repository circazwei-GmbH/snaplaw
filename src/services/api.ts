import axios, { AxiosRequestConfig } from "axios";
import { setAuthTokens } from "./auth/tokens";
import { API_HOST } from "../env/env";
import { connect } from "./socket";
import {Translator} from "../translator/i18n";
import {LANGUAGE_GERMANY} from "../store/modules/profile/constants";

let token: undefined | string;
let refresh: undefined | string;

const setToken = (_token: undefined | string, _refresh: undefined | string) => {
  token = _token;
  refresh = _refresh;
};

const getToken = () => token;

const attachTokenToConfig = (
  options: AxiosRequestConfig
): AxiosRequestConfig => {
  const authorization = `Bearer ${token}`;
  return {
    ...options,
    headers: {
      authorization,
      ...options.headers,
    },
  };
};

const _call = async (
  method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH",
  url: string,
  body: any,
  options?: AxiosRequestConfig,
  secondCall = false
): Promise<any> => {
  const locale = Translator.getInstance().getLanguage() === LANGUAGE_GERMANY ? "de" : "en";
  try {
    return await axios.request(
      attachTokenToConfig({
        ...options,
        method,
        params: {
          locale
        },
        url: `${API_HOST}/${url}`,
        data: body
      })
    );
  } catch (error) {
    if (error.response?.status === 401 && !secondCall) {
      const tokens = await axios.post(`${API_HOST}/refresh-token`, {
        refreshToken: refresh,
      });
      setToken(tokens.data.token, tokens.data.refreshToken);
      await setAuthTokens(tokens.data.token, tokens.data.refreshToken);
      await connect();
      return _call(method, url, body, options, true);
    }
    throw error;
  }
};

const putWithoutHost = (url: string, body: any, options?: AxiosRequestConfig) =>
  axios.put(url, body, options);

const get = (url: string) => _call("GET", url, null);

const post = (url: string, body: any, options?: AxiosRequestConfig) =>
  _call("POST", url, body, options);

const put = (url: string, body: any, options?: AxiosRequestConfig) =>
  _call("PUT", url, body, options);

const del = (url: string, options?: AxiosRequestConfig) =>
  _call("DELETE", url, undefined, options);
const patch = (url: string, body: any, options?: AxiosRequestConfig) =>
  _call("PATCH", url, body, options);

export default {
  getToken,
  setToken,
  get,
  post,
  put,
  patch,
  delete: del,
  putWithoutHost,
};

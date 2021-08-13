import axios, {AxiosRequestConfig} from 'axios'
import {setAuthTokens} from "./auth/tokens";

const API_HOST = 'http://192.168.31.100:8080'

let token: undefined | string;
let refresh: undefined | string;

const setToken = (_token: undefined | string, _refresh: undefined | string) => {
    token = _token
    refresh = _refresh
}

const getToken = () => token

const attachTokenToConfig = (options?: AxiosRequestConfig): AxiosRequestConfig => {
    const authorization = `Bearer ${token}`

    if (!options) {
        return {
            headers: {
                authorization
            }
        }
    }

    return {
        ...options,
        headers: {
            authorization,
            ...options.headers,
        }
    }
}

const _call = async (
    method: 'GET' | 'PUT' | 'POST',
    url: string,
    body: any,
    options?: AxiosRequestConfig,
    secondCall: boolean = false
): Promise<any> => {
    try {
        return await axios.request(attachTokenToConfig({
            ...options,
            method,
            url: `${API_HOST}/${url}`,
            data: body,
        }))
    } catch (error) {
        if (error.response?.status === 401 && !secondCall) {
            const tokens = await axios.post(`${API_HOST}/refresh-token`, {
                refreshToken: refresh
            })
            setToken(tokens.data.token, tokens.data.refreshToken)
            await setAuthTokens(tokens.data.token, tokens.data.refreshToken)
            return _call(method, url, body, options, true)
        }
        throw error
    }
}

const putWithoutHost = (url: string, body: any, options?: AxiosRequestConfig) =>
    axios.put(url, body, options)

const get = (url: string) => _call('GET', url, null)

const post = (url: string, body: any, options?: AxiosRequestConfig) => _call('POST', url, body, options)

const put = (url: string, body: any, options?: AxiosRequestConfig) => _call('PUT', url, body, options)

export default { getToken, setToken, get, post, put, putWithoutHost }
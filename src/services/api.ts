import axios, {AxiosRequestConfig} from 'axios'

const API_HOST = 'https://snaplaw-api.jsninjas.net'

let token: undefined | string;

const setToken = (t: undefined | string) => {
    token = t
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

const putWithoutHost = (url: string, body: any) =>
    axios.put(url, body)

const get = (url: string) =>
    axios.get(`${API_HOST}/${url}`, attachTokenToConfig())

const post = (url: string, body: any, options?: AxiosRequestConfig) =>
    axios.post(`${API_HOST}/${url}`, body, attachTokenToConfig(options))

const put = (url: string, body: any, options?: AxiosRequestConfig) =>
    axios.put(`${API_HOST}/${url}`, body, attachTokenToConfig(options))

export default { getToken, setToken, get, post, put, putWithoutHost }
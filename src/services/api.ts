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

const _call = async (
    method: 'GET' | 'PUT' | 'POST',
    url: 'string',
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
                refreshToken: token
            })
            setToken(tokens.data.token)
            return _call(method, url, body, options, true)
        }
        throw error
    }

}

const putWithoutHost = (url: string, body: any, options?: AxiosRequestConfig) =>
    axios.put(url, body, options)

const get = (url: string) =>
    axios.get(`${API_HOST}/${url}`, attachTokenToConfig())

const post = (url: string, body: any, options?: AxiosRequestConfig) =>
    axios.post(`${API_HOST}/${url}`, body, attachTokenToConfig(options))

const put = (url: string, body: any, options?: AxiosRequestConfig) =>
    axios.put(`${API_HOST}/${url}`, body, attachTokenToConfig(options))

export default { getToken, setToken, get, post, put, putWithoutHost }
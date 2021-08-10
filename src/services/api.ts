import axios, {AxiosRequestConfig} from 'axios'

const API_HOST = 'https://snaplaw-api.jsninjas.net'

const get = (url: string) =>
    axios.get(`${API_HOST}/${url}`)

const post = (url: string, body: any, options?: AxiosRequestConfig) =>
    axios.post(`${API_HOST}/${url}`, body, options)

const put = (url: string, body: any, options?: AxiosRequestConfig) =>
    axios.put(`${API_HOST}/${url}`, body, options)

export default { get, post, put }
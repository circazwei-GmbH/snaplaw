import axios, {AxiosRequestConfig} from 'axios'

const API_HOST = 'http://192.168.31.100:4000'

const get = (url: string) => {
    return axios.get(`${API_HOST}/${url}`)
}

const post = (url: string, body: any, options?: AxiosRequestConfig) => {
    return axios.post(`${API_HOST}/${url}`, body, options)
}

export default { get, post }
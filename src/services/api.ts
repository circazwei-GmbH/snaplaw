import axios from 'axios'

const API_HOST = 'https://snaplaw-api.jsninjas.net'

const get = (url: string) => {
    return axios.get(`${API_HOST}/${url}`)
}

const post = (url: string, body: any) => {
    return axios.post(`${API_HOST}/${url}`, body)
}

export default { get, post }
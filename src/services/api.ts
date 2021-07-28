import axios from 'axios'

const API_HOST = 'http://192.168.210.110:4000'

const get = (url: string) => {
    return axios.get(`${API_HOST}/${url}`)
}

const post = (url: string, body: any) => {
    return axios.post(`${API_HOST}/${url}`, body)
}

export default { get, post }
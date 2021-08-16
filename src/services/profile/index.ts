import httpClient from '../api'
import {getUserFromToken} from "../../utils";


const updateUserAvatar = (avatarPath: string | null) => {
    const token = httpClient.getToken()
    if (!token) {
        throw new Error('Trying to update user avatar with empty token');
    }
    const user = getUserFromToken(token)
    return httpClient.put(`api/users/${user._id}`, {avatar: avatarPath})
}

const requestMe = () =>
    httpClient.get('me')

export default {
    updateUserAvatar,
    requestMe
}
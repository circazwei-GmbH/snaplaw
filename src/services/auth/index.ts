import {SignInPayload, SignUpPayload} from "../../store/modules/auth/types";
import httpClient from '../api'

const signUp = (user: SignUpPayload) => {
    return httpClient.post('signup', {
        ...user,
        firstName: user.name,
        lastName: 'test',
        phone: '+380952158989'
    })
}

const signIn = (payload: SignInPayload) => {
    return httpClient.post('login', payload)
}

export default {
    signUp,
    signIn
}
import {createSlice, PayloadAction, Draft} from '@reduxjs/toolkit'

interface AuthState {
    signUp: {
        error: {
            email: string
        }
    },
    signIn: {
        error: {
            email: string,
            password: string
        }
    },
    verification: {
        error: string
    }
    token: undefined | string,
}

const initialState: AuthState = {
    signUp: {
        error: {
            email: ''
        }
    },
    signIn: {
        error: {
            email: '',
            password: ''
        },
    },
    verification: {
        error: ''
    },
    token: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUpFailed: (state: Draft<AuthState>, action: PayloadAction<{email: string}>) => {
            state.signUp.error = action.payload
        },
        signInFailed: (state: Draft<AuthState>, action: PayloadAction<{field: 'email' | 'password', message: string}>) => {
            state.signIn.error[action.payload.field] = action.payload.message;
        },
        verificationFailed: (state: Draft<AuthState>, action: PayloadAction<string>) => {
            state.verification.error = action.payload
        },
        clearSignInErrors: (state: Draft<AuthState>) => {
            state.signIn.error = {email: '', password: ''}
        },
        setToken: (state: Draft<AuthState>, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        killToken: (state: Draft<AuthState>) => {
            state.token = ''
        },
    }
})

export const { signUpFailed, signInFailed, setToken, killToken, clearSignInErrors, verificationFailed } = authSlice.actions

export default authSlice.reducer
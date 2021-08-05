import {createSlice, PayloadAction, Draft, createAction} from '@reduxjs/toolkit'

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
    forgotPassword: {
        error: string
    },
    changePassword: {
        error: string
    }
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
    forgotPassword: {
        error: ''
    },
    changePassword: {
        error: ''
    }
}

const signUpFailedAction = createAction<{email: string}, 'signUpFailed'>('signUpFailed')
const signInFailedAction = createAction<{field: 'email' | 'password', message: string}, 'signInFailed'>('signInFailed')
const verificationFailedAction = createAction<string, 'verificationFailed'>('verificationFailed')
const clearSignInErrorsAction = createAction<undefined, 'clearSignInErrors'>('clearSignInErrors')
const clearSignUpErrorsAction = createAction<undefined, 'clearSignUpErrors'>('clearSignUpErrors')
const setTokenAction = createAction<string, 'setToken'>('setToken')
const killTokenAction = createAction<undefined, 'killToken'>('killToken')
const forgotPasswordFailedAction = createAction<string, 'forgotPasswordFailed'>('forgotPasswordFailed')
const changePasswordFailedAction = createAction<string, 'changePasswordFailed'>('changePasswordFailed')

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        [signUpFailedAction.type]: (state: Draft<AuthState>, action: PayloadAction<{email: string}>) => {
            state.signUp.error = action.payload
        },
        [signInFailedAction.type]: (state: Draft<AuthState>, action: PayloadAction<{field: 'email' | 'password', message: string}>) => {
            state.signIn.error[action.payload.field] = action.payload.message;
        },
        [verificationFailedAction.type]: (state: Draft<AuthState>, action: PayloadAction<string>) => {
            state.verification.error = action.payload
        },
        [clearSignInErrorsAction.type]: (state: Draft<AuthState>) => {
            state.signIn.error = {email: '', password: ''}
        },
        [clearSignUpErrorsAction.type]: (state: Draft<AuthState>) => {
            state.signUp.error = {email: ''}
        },
        [setTokenAction.type]: (state: Draft<AuthState>, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        [killTokenAction.type]: (state: Draft<AuthState>) => {
            state.token = ''
        },
        [forgotPasswordFailedAction.type]: (state: Draft<AuthState>, action: PayloadAction<string>) => {
            state.forgotPassword.error = action.payload
        },
        [changePasswordFailedAction.type]: (state: Draft<AuthState>, action: PayloadAction<string>) => {
            state.changePassword.error = action.payload
        }
    }
})

export const { signUpFailed, signInFailed, setToken, killToken, clearSignInErrors, verificationFailed, forgotPasswordFailed, changePasswordFailed, clearSignUpErrors } = authSlice.actions
export const actions = authSlice.actions

export default authSlice.reducer
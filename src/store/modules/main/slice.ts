import {createSlice, PayloadAction, Draft} from '@reduxjs/toolkit'

interface ModalActionInterface {
    action?: any | undefined,
    name: string,
    colortype?: string | undefined
}

export interface ModalInterface {
    message: string,
    actions: ModalActionInterface[]
}

interface MainStateInterface {
    modal: ModalInterface,
}

const initialState: MainStateInterface = {
    modal: {
        message: '',
        actions: []
    }
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setMessage: (state: Draft<MainStateInterface>, action: PayloadAction<string>) => {
            state.modal = {
                message: action.payload,
                actions: [
                    {
                        name: 'Ok',
                        colortype: 'primary'
                    }
                ]
            }
        },
        setModal: (state: Draft<MainStateInterface>, action: PayloadAction<{message: string, actions: ModalActionInterface[]}>) => {
            state.modal = action.payload
        },
        closeModal: (state: Draft<MainStateInterface>) => {
            state.modal = {
                message: '',
                actions: []
            }
        }
    },
})

export const {
    setMessage,
    closeModal,
    setModal
} = mainSlice.actions

export default mainSlice.reducer
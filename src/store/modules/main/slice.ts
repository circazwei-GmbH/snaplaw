import {createSlice, PayloadAction, Draft, createAction} from '@reduxjs/toolkit'

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

const setMessageAction = createAction<string, 'setMessage'>('setMessage')
const setModalAction = createAction<{message: string, actions: ModalActionInterface[]}, 'setModal'>('setModal')
const closeModalAction = createAction<undefined, 'closeModal'>('closeModal')

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        [setMessageAction.type]: (state: Draft<MainStateInterface>, action: PayloadAction<string>) => {
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
        [setModalAction.type]: (state: Draft<MainStateInterface>, action: PayloadAction<{message: string, actions: ModalActionInterface[]}>) => {
            state.modal = action.payload
        },
        [closeModalAction.type]: (state: Draft<MainStateInterface>) => {
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
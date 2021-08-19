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
    modal: ModalInterface | null,
    waiter: Array<string>
}

const initialState: MainStateInterface = {
    modal: null,
    waiter: []
}

const setMessageAction = createAction<string, 'setMessage'>('setMessage')
const setModalAction = createAction<{message: string, actions: ModalActionInterface[]}, 'setModal'>('setModal')
const closeModalAction = createAction<undefined, 'closeModal'>('closeModal')
const addToWaiterAction = createAction<string, 'addToWAiter'>('addToWAiter')
const removeFromWaiterAction = createAction<string, 'removeFromWaiter'>('removeFromWaiter')

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
            state.modal = null
        },
        [addToWaiterAction.type]: (state: Draft<MainStateInterface>, action: PayloadAction<string>) => {
            state.waiter.push(action.payload)
        },
        [removeFromWaiterAction.type]: (state: Draft<MainStateInterface>, action: PayloadAction<string>) => {
            state.waiter.splice(state.waiter.indexOf(action.payload), 1)
        }
    },
})

export const {
    setMessage,
    closeModal,
    setModal,
    addToWAiter,
    removeFromWaiter
} = mainSlice.actions

export default mainSlice.reducer
import {createSlice, PayloadAction, Draft} from '@reduxjs/toolkit'

interface MainStateInterface {
    modalMessage: string,
}

const initialState: MainStateInterface = {
    modalMessage: ''
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setModalMessage: (state: Draft<MainStateInterface>, action: PayloadAction<string>) => {
            state.modalMessage = action.payload
        },
        closeModal: (state: Draft<MainStateInterface>) => {
            state.modalMessage = ''
        }
    },
})

export const {
    setModalMessage,
    closeModal
} = mainSlice.actions

export default mainSlice.reducer
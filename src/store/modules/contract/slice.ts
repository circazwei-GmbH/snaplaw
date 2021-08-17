import {createSlice} from "@reduxjs/toolkit";

interface ContractState {
    currentContract: {} | undefined
}

const initialState: ContractState = {
    currentContract: undefined
}


const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {

    }
})

export const {  } = contractSlice.actions

export default contractSlice.reducer
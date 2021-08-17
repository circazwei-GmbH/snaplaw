import {createAction, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {Contract} from "./types";

interface ContractState {
    currentContract: Contract | undefined
}

const initialState: ContractState = {
    currentContract: undefined
}

const setInitedContractAction = createAction<string, 'setInitedContract'>('setInitedContract')

const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        [setInitedContractAction.type]: (state: Draft<ContractState>, action: PayloadAction<string>) => {
            state.currentContract = {id: action.payload}
        }
    }
})

export const { setInitedContract } = contractSlice.actions

export default contractSlice.reducer
import {RequestCreateContractAction} from "./types";

export const REQUEST_CREATE_CONTRACT = 'REQUEST_CREATE_CONTRACT'

export const requestCreateContract = (type: CONTRACT_TYPES): RequestCreateContractAction => ({
    type: REQUEST_CREATE_CONTRACT,
    payload: type
})
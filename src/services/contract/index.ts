import {CONTRACT_TYPES} from "../../store/modules/contract/constants";
import httpClient from '../api'
import {ScreenDataType} from "../../store/modules/contract/types";


const createContract = (type: CONTRACT_TYPES) =>
    httpClient.post('api/contracts', {type})


const saveScreenData = (id: string, screen: ScreenDataType) =>
    httpClient.put(`api/contracts/${id}`, {
        ...screen.data,
        screenType: screen.type
    })

export default {
    createContract,
    saveScreenData
}
import {CONTRACT_TYPES} from "../../store/modules/contract/constants";
import httpClient from '../api'


const createContract = (type: CONTRACT_TYPES) => {
    return httpClient.post('api/contracts', {type})
}

export default {
    createContract
}
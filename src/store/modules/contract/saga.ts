import {call, put, takeLatest} from "redux-saga/effects";
import {REQUEST_CREATE_CONTRACT} from "./action-creators";
import {RequestCreateContractAction} from "./types";
import API from '../../../services/contract/index'
import {responseError} from "../auth/action-creators";
import {addToWAiter, removeFromWaiter} from "../main/slice";
import {CONTRACT_CREATION_WAIT} from "./constants";
import {setInitedContract} from "./slice";
import * as RootHavigation from '../../../router/RootNavigation'
import {HOME_ROUTER} from "../../../router/HomeRouterType";

function* createContract({payload}: RequestCreateContractAction) {
    try {
        yield put(addToWAiter(CONTRACT_CREATION_WAIT))
        const response = yield call(API.createContract, payload)
        yield put(setInitedContract({
            id: response.data.id,
            type: payload
        }))
        RootHavigation.navigate(HOME_ROUTER.CONTRACT, {screenCount: 0})
    } catch (error) {
        yield put(responseError(error));
    } finally {
        yield put(removeFromWaiter(CONTRACT_CREATION_WAIT))
    }
}

function* contractSaga() {
    yield takeLatest(REQUEST_CREATE_CONTRACT, createContract)
}

export default contractSaga
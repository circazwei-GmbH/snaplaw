import {call, put, takeLatest, select} from "redux-saga/effects";
import {REQUEST_CREATE_CONTRACT, REQUEST_SCREEN_DATA} from "./action-creators";
import {RequestCreateContractAction, RequestScreenDataAction} from "./types";
import API from '../../../services/contract/index'
import {responseError} from "../auth/action-creators";
import {addToWAiter, removeFromWaiter} from "../main/slice";
import {CONTRACT_CREATION_WAIT} from "./constants";
import {setInitedContract} from "./slice";
import * as RootHavigation from '../../../router/RootNavigation'
import {HOME_ROUTER} from "../../../router/HomeRouterType";
import {RootState} from "../../index";

function* createContract({payload}: RequestCreateContractAction) {
    try {
        yield put(addToWAiter(CONTRACT_CREATION_WAIT))
        const response = yield call(API.createContract, payload)
        yield put(setInitedContract({
            id: response.data.id,
            type: payload,
            screens: []
        }))
        RootHavigation.navigate(HOME_ROUTER.CONTRACT, {screenCount: 0})
    } catch (error) {
        yield put(responseError(error));
    } finally {
        yield put(removeFromWaiter(CONTRACT_CREATION_WAIT))
    }
}

function* requestScreenData({payload}: RequestScreenDataAction) {
    const screenData = yield select<(state: RootState) => unknown>(state => state.contract.currentContract?.screens[payload])
    if (!screenData) {
        console.log('request skiped')
        return;
    }
    try {
        console.log(screenData)
    } catch (error) {
        yield put(responseError(error));
    }
}

function* contractSaga() {
    yield takeLatest(REQUEST_CREATE_CONTRACT, createContract)
    yield takeLatest(REQUEST_SCREEN_DATA, requestScreenData)
}

export default contractSaga
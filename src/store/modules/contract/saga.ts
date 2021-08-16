import {takeLatest} from "redux-saga/effects";
import {REQUEST_CREATE_CONTRACT} from "./action-creators";
import {RequestCreateContractAction} from "./types";

function* createContract({payload}: RequestCreateContractAction) {
    console.log(payload)
}

function* contractSaga() {
    yield takeLatest(REQUEST_CREATE_CONTRACT, createContract)
}

export default contractSaga
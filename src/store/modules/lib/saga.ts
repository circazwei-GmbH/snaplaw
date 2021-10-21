import { call, put, takeLatest } from "@redux-saga/core/effects";
import { responseError } from "../auth/action-creators";
import { addToWaiter, removeFromWaiter } from "../main/slice";
import API from "../../../services/lib/index";
import { REQUEST_CAR_INFORMATION } from "./action-creators";
import { RequestCarInformationAction } from "./types";
import { setCarInfo } from "./slice";

function* requestCarInformation({ payload }: RequestCarInformationAction) {
  yield put(addToWaiter({ event: REQUEST_CAR_INFORMATION }));
  try {
    const response = yield call(API.requestCarInformation, payload);
    yield put(setCarInfo(response.data));
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(removeFromWaiter({ event: REQUEST_CAR_INFORMATION }));
  }
}

function* libSaga() {
  yield takeLatest(REQUEST_CAR_INFORMATION, requestCarInformation);
}

export default libSaga;

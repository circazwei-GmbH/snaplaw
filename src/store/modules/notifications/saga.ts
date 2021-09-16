import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  REQUEST_NOTIFICATIONS,
  REQUEST_CHANGE_NOTIFICATION_STATUS,
} from "./action-creators";
import { RequestChangeNotificationStatusAction } from "./types";
import { setNotifications, changeNotificationStatus } from "./slice";
import API from "../../../services/notification/index";
import { responseError } from "../auth/action-creators";

function* requestNotificationsList() {
  const listPagination = yield select(
    (state) => state.notifications.notificationsPagination
  );
  const currentList = yield select(
    (state) => state.notifications.notifications
  );
  try {
    const page = listPagination.page + (currentList.length ? 1 : 0);
    const list = yield call(API.requestNotifications, page);
    yield put(setNotifications({ list, page }));
  } catch (error) {
    yield put(responseError(error));
  }
}

function* changeStatus({
  payload: { id },
}: RequestChangeNotificationStatusAction) {
  try {
    yield call(API.requestChangeStatus, id);
    yield put(changeNotificationStatus({ id }));
  } catch (error) {
    yield put(responseError(error));
  }
}

function* notificationsSaga() {
  yield takeLatest(REQUEST_NOTIFICATIONS, requestNotificationsList);
  yield takeLatest(REQUEST_CHANGE_NOTIFICATION_STATUS, changeStatus);
}

export default notificationsSaga;

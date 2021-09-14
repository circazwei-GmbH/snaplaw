import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  REQUEST_NOTIFICATIONS,
  CHANGE_NOTIFICATION_STATUS,
} from "./action-creators";
import { ChangeNotificationStatusAction } from "./types";
import { setNotifications } from "./slice";
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

function* changeStatus({ payload }: ChangeNotificationStatusAction) {
  try {
    console.log("change status");
  } catch (error) {
    yield put(responseError(error));
  }
}

function* notificationsSaga() {
  yield takeLatest(REQUEST_NOTIFICATIONS, requestNotificationsList);
  yield takeLatest(CHANGE_NOTIFICATION_STATUS, changeStatus);
}

export default notificationsSaga;

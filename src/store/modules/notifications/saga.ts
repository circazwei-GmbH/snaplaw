import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  REQUEST_NOTIFICATIONS,
  RequestNotificationsAction,
} from "./action-creators";
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
    console.log(currentList);

    const page = listPagination.page + (currentList.length ? 1 : 0);
    const list = yield call(API.requestNotifications, { page });
    yield put(setNotifications({ list, page }));
  } catch (error) {
    console.log(error);
    yield put(responseError(error));
  }
}

function* notificationsSaga() {
  yield takeLatest(REQUEST_NOTIFICATIONS, requestNotificationsList);
}

export default notificationsSaga;

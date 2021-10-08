import { call, put, takeLatest } from "redux-saga/effects";
import {
  INIT_PUSH_NOTIFICATIONS,
  NAVIGATE,
  NAVIGATE_POP,
  NavigateAction,
  NAVIGATION_POP_TO_TOP,
  ORIENTATION,
  OrientationAction,
} from "./action-creators";
import * as RootNavigation from "../../../router/RootNavigation";
import * as ScreenOrientation from "expo-screen-orientation";
import { setOrientation } from "./slice";
import * as NotificationService from "../../../services/push-notifications";
import {responseError} from "../auth/action-creators";

function* navigateToTop() {
  RootNavigation.popToTop();
}

function* changeOrientation({ payload }: OrientationAction) {
  try {
    yield call(ScreenOrientation.lockAsync, payload);
    yield put(setOrientation(payload));
  } catch (error) {
    console.log(error);
  }
}

function* navigate({ payload }: NavigateAction) {
  for (let route in payload) {
    RootNavigation.navigate(route, payload[route]);
  }
}

function* navigatePop() {
  RootNavigation.pop();
}

function* initPushNotifications() {
  try {
    const expoPushNotificationToken = yield call(NotificationService.init);
    yield call(NotificationService.storeTokenToApi, expoPushNotificationToken);
  } catch (error) {
    if (error instanceof NotificationService.PermissionNotGranted) {
      // do nothing
      return;
    }
    yield put(responseError(error));
  }
}

function* mainSaga() {
  yield takeLatest(NAVIGATION_POP_TO_TOP, navigateToTop);
  yield takeLatest(ORIENTATION, changeOrientation);
  yield takeLatest(NAVIGATE, navigate);
  yield takeLatest(NAVIGATE_POP, navigatePop);
  yield takeLatest(INIT_PUSH_NOTIFICATIONS, initPushNotifications);
}

export default mainSaga;

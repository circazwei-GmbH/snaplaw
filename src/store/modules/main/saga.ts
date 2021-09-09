import { call, put, takeLatest } from "redux-saga/effects";
import {
  NAVIGATE,
  NavigateAction,
  NAVIGATION_POP_TO_TOP,
  ORIENTATION,
  OrientationAction,
} from "./action-creators";
import * as RootNavigation from "../../../router/RootNavigation";
import * as ScreenOrientation from "expo-screen-orientation";
import { setOrientation } from "./slice";

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

function* mainSaga() {
  yield takeLatest(NAVIGATION_POP_TO_TOP, navigateToTop);
  yield takeLatest(ORIENTATION, changeOrientation);
  yield takeLatest(NAVIGATE, navigate);
}

export default mainSaga;

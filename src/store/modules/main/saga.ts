import {call, takeLatest} from "redux-saga/effects";
import {NAVIGATION_POP_TO_TOP, ORIENTATION, OrientationAction} from "./action-creators";
import * as RootNavigation from "../../../router/RootNavigation";
import * as ScreenOrientation from 'expo-screen-orientation';

function* navigateToTop() {
  RootNavigation.popToTop();
}

function* changeOrientation({payload}: OrientationAction) {
  yield call(ScreenOrientation.lockAsync, payload)
}

function* mainSaga() {
  yield takeLatest(NAVIGATION_POP_TO_TOP, navigateToTop);
  yield takeLatest(ORIENTATION, changeOrientation)
}

export default mainSaga;

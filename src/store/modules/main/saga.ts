import { takeLatest } from "redux-saga/effects";
import { NAVIGATION_POP_TO_TOP } from "./action-creators";
import * as RootNavigation from "../../../router/RootNavigation";

function* navigateToTop() {
  RootNavigation.popToTop();
}

function* mainSaga() {
  yield takeLatest(NAVIGATION_POP_TO_TOP, navigateToTop);
}

export default mainSaga;

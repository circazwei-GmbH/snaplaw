import { BaseAction } from "../auth/types";
import * as ScreenOrientation from "expo-screen-orientation";

export const NAVIGATION_POP_TO_TOP = "NAVIGATION_POP_TO_TOP";
export const ORIENTATION = "ORIENTATION";

type NavigationPopToTopAction = BaseAction;
export type AllowOrientationType =
  | ScreenOrientation.OrientationLock.PORTRAIT_UP
  | ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT;
export interface OrientationAction extends BaseAction {
  payload: AllowOrientationType;
}

export const navigationPopToTop = (): NavigationPopToTopAction => ({
  type: NAVIGATION_POP_TO_TOP,
  payload: undefined,
});

export const orientationChange = (target: AllowOrientationType) => ({
  type: ORIENTATION,
  payload: target,
});

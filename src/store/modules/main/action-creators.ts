import { BaseAction } from "../auth/types";
import * as ScreenOrientation from "expo-screen-orientation";

export const NAVIGATION_POP_TO_TOP = "NAVIGATION_POP_TO_TOP";
export const ORIENTATION = "ORIENTATION";
export const NAVIGATE = "NAVIGATE";

type NavigationPopToTopAction = BaseAction;
export type AllowOrientationType =
  | ScreenOrientation.OrientationLock.PORTRAIT_UP
  | ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT;
export interface OrientationAction extends BaseAction {
  payload: AllowOrientationType;
}

export interface NavigateAction extends BaseAction {
  payload: Record<string, Record<string, any>>;
}

export const navigationPopToTop = (): NavigationPopToTopAction => ({
  type: NAVIGATION_POP_TO_TOP,
  payload: undefined,
});

export const orientationChange = (target: AllowOrientationType) => ({
  type: ORIENTATION,
  payload: target,
});

export const navigate = (
  target: Record<string, Record<string, any>>
): NavigateAction => ({
  type: NAVIGATE,
  payload: target,
});

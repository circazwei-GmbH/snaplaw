import {BaseAction} from "../auth/types";

export const NAVIGATION_POP_TO_TOP = 'NAVIGATION_POP_TO_TOP';

interface NavigationPopToTopAction extends BaseAction {}

export const navigationPopToTop = (): NavigationPopToTopAction => ({
    type: NAVIGATION_POP_TO_TOP,
    payload: undefined
})
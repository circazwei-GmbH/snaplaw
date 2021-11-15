import {
  createAction,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import { OrientationLock } from "expo-screen-orientation";
import { AllowOrientationType } from "./action-creators";
import { BUTTON_COLORTYPE } from "./types";

interface ModalActionInterface {
  action?: any | undefined;
  name: string;
  colortype?: BUTTON_COLORTYPE | undefined;
}

export interface ModalInterface {
  message: string;
  actions: ModalActionInterface[];
}

interface MainStateInterface {
  modal: ModalInterface | null;
  waiter: {
    events: Array<string>;
    message: string | undefined;
  };
  orientation: AllowOrientationType;
}

interface WaiterActionInterface {
  event: string;
  message?: string;
}

const initialState: MainStateInterface = {
  modal: null,
  waiter: {
    events: [],
    message: undefined,
  },
  orientation: OrientationLock.PORTRAIT_UP,
};

const setMessageAction = createAction<string, "setMessage">("setMessage");
const setModalAction = createAction<
  { message: string; actions: ModalActionInterface[] },
  "setModal"
>("setModal");
const closeModalAction = createAction<undefined, "closeModal">("closeModal");
const addToWaiterAction = createAction<WaiterActionInterface, "addToWaiter">(
  "addToWaiter"
);
const removeFromWaiterAction = createAction<
  WaiterActionInterface,
  "removeFromWaiter"
>("removeFromWaiter");
const setOrientationAction = createAction<OrientationType, "setOrientation">(
  "setOrientation"
);
const clearMainStateAction = createAction<
  MainStateInterface,
  "clearMainState"
>("clearMainState");

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    [setMessageAction.type]: (
      state: Draft<MainStateInterface>,
      action: PayloadAction<string>
    ) => {
      state.modal = {
        message: action.payload,
        actions: [
          {
            name: "Ok",
            colortype: BUTTON_COLORTYPE.PRIMARY,
          },
        ],
      };
    },
    [setModalAction.type]: (
      state: Draft<MainStateInterface>,
      action: PayloadAction<{
        message: string;
        actions: ModalActionInterface[];
      }>
    ) => {
      state.modal = action.payload;
    },
    [closeModalAction.type]: (state: Draft<MainStateInterface>) => {
      state.modal = null;
    },
    [addToWaiterAction.type]: (
      state: Draft<MainStateInterface>,
      action: PayloadAction<WaiterActionInterface>
    ) => {
      state.waiter.events.push(action.payload.event);
      state.waiter.message = action.payload.message ?? action.payload.message;
    },
    [removeFromWaiterAction.type]: (
      state: Draft<MainStateInterface>,
      action: PayloadAction<WaiterActionInterface>
    ) => {
      state.waiter.events.splice(
        state.waiter.events.indexOf(action.payload.event),
        1
      );
      state.waiter.message = action.payload.message ?? action.payload.message;
    },
    [setOrientationAction.type]: (
      state: Draft<MainStateInterface>,
      action: PayloadAction<AllowOrientationType>
    ) => {
      state.orientation = action.payload;
    },
    [clearMainStateAction.type]: (state: Draft<MainStateInterface>) => {
      return initialState;
    },
  },
});

export const {
  setMessage,
  closeModal,
  setModal,
  addToWaiter,
  removeFromWaiter,
  setOrientation,
  clearMainState,
} = mainSlice.actions;

export default mainSlice.reducer;

import {createAction, createSlice, Draft, PayloadAction,} from "@reduxjs/toolkit";
import {OrientationLock} from "expo-screen-orientation";
import {AllowOrientationType} from "./action-creators";

interface ModalActionInterface {
  action?: any | undefined;
  name: string;
  colortype?: string | undefined;
}

export interface ModalInterface {
  message: string;
  actions: ModalActionInterface[];
}

interface MainStateInterface {
  modal: ModalInterface | null;
  waiter: Array<string>;
  orientation: AllowOrientationType
}

const initialState: MainStateInterface = {
  modal: null,
  waiter: [],
  orientation: OrientationLock.PORTRAIT_UP
};

const setMessageAction = createAction<string, "setMessage">("setMessage");
const setModalAction = createAction<
  { message: string; actions: ModalActionInterface[] },
  "setModal"
>("setModal");
const closeModalAction = createAction<undefined, "closeModal">("closeModal");
const addToWaiterAction = createAction<string, "addToWAiter">("addToWAiter");
const removeFromWaiterAction = createAction<string, "removeFromWaiter">(
  "removeFromWaiter"
);
const setOrientationAction = createAction<OrientationType, 'setOrientation'>('setOrientation')

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
            colortype: "primary",
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
      action: PayloadAction<string>
    ) => {
      state.waiter.push(action.payload);
    },
    [removeFromWaiterAction.type]: (
      state: Draft<MainStateInterface>,
      action: PayloadAction<string>
    ) => {
      state.waiter.splice(state.waiter.indexOf(action.payload), 1);
    },
    [setOrientationAction.type]: (
        state: Draft<MainStateInterface>,
        action: PayloadAction<OrientationType>
    ) => {
      state.orientation = action.payload
    }
  },
});

export const {
  setMessage,
  closeModal,
  setModal,
  addToWAiter,
  removeFromWaiter,
    setOrientation
} = mainSlice.actions;

export default mainSlice.reducer;

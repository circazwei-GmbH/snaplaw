import {
  createAction,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Contract } from "./types";
import {CONTRACT_SCREEN_TYPES, CONTRACT_TYPES} from "./constants";

interface ContractState {
  currentContract: Contract | undefined;
  contractErrors: Record<CONTRACT_SCREEN_TYPES, Record<string, string> | undefined> | undefined
}

const initialState: ContractState = {
  currentContract: undefined,
  contractErrors: undefined
};

type ScreenData = {
  screenType: CONTRACT_SCREEN_TYPES;
  fieldName: string;
  value: unknown;
};

type FieldErrorData = {
  screenType: CONTRACT_SCREEN_TYPES,
  field: string,
  message: string
}

const setInitedContractAction = createAction<string, "setInitedContract">(
  "setInitedContract"
);
const setScreenDataAction = createAction<ScreenData, "setScreenData">(
  "setScreenData"
);
const setFieldErrorAction = createAction<FieldErrorData, 'setFieldError'>('setFieldError')
const clearErrorsAction = createAction<undefined, 'clearErrors'>('clearErrors')

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    [setInitedContractAction.type]: (
      state: Draft<ContractState>,
      action: PayloadAction<Contract>
    ) => {
      state.currentContract = action.payload;
    },
    [setScreenDataAction.type]: (
      state: Draft<ContractState>,
      action: PayloadAction<ScreenData>
    ) => {
      if (!state.currentContract) {
        return;
      }

      const screen = state.currentContract.screens.find(
        (screen) => screen.type === action.payload.screenType
      );

      const updatedScreen = {
        type: action.payload.screenType,
        data: Object.assign(screen ? screen.data : {}, {
          [action.payload.fieldName]: action.payload.value,
        }),
      };

      if (screen) {
        state.currentContract.screens = state.currentContract.screens.map(
          (screen) => {
            if (screen.type !== updatedScreen.type) {
              return screen;
            }

            return updatedScreen;
          }
        );
      } else {
        state.currentContract.screens.push(updatedScreen);
      }
    },
    [setFieldErrorAction.type]: (
      state: Draft<ContractState>,
      action: PayloadAction<FieldErrorData>
    ) => {
      if (!state.currentContract) {
        return;
      }
      state.contractErrors = {
        ...state.contractErrors,
        [action.payload.screenType]: {
        ...(state.contractErrors && state.contractErrors[action.payload.screenType] ? state.contractErrors[action.payload.screenType] : {}),
        ...(state.contractErrors && state.contractErrors[action.payload.screenType] && state.contractErrors[action.payload.screenType][action.payload.field] ? state.contractErrors[action.payload.screenType][action.payload.field] : {}),
          [action.payload.field]: action.payload.message
        }
      }
      console.log(action.payload.message, action.payload.screenType, action.payload.field)
    },
    [clearErrorsAction.type]: (
      state: Draft<ContractState>,
      action: PayloadAction<undefined>
    ) => {
      state.contractErrors = undefined
    }
  },
});

export const { setInitedContract, setScreenData, setFieldError, clearErrors } = contractSlice.actions;

export default contractSlice.reducer;

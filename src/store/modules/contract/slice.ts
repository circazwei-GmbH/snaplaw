import {
  createAction,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CONTRACT_LIST_STATE, ContractDataType, ContractListType} from "./types";
import { CONTRACT_SCREEN_TYPES } from "./constants";

interface ContractState {
  currentContract: ContractDataType | undefined;
  contractErrors:
    | Record<CONTRACT_SCREEN_TYPES, Record<string, string> | undefined>
    | undefined;
  contracts: ContractListType | [];
  isListLoading: boolean;
  listPagination: {
    listType: CONTRACT_LIST_STATE;
    page: number;
    isNextPage: boolean;
  };
}

const initialState: ContractState = {
  currentContract: undefined,
  contractErrors: undefined,
  contracts: [],
  isListLoading: false,
  listPagination: {
    listType: CONTRACT_LIST_STATE.FINALIZED,
    page: 0,
    isNextPage: true,
  },
};

type ScreenData = {
  screenType: CONTRACT_SCREEN_TYPES;
  fieldName: string;
  value: unknown;
};

type FieldErrorData = {
  screenType: CONTRACT_SCREEN_TYPES;
  field: string;
  message: string | undefined;
};

const setInitedContractAction = createAction<string, "setInitedContract">(
  "setInitedContract"
);
const setScreenDataAction = createAction<ScreenData, "setScreenData">(
  "setScreenData"
);
const setFieldErrorAction = createAction<FieldErrorData, "setFieldError">(
  "setFieldError"
);
const clearErrorsAction = createAction<undefined, "clearErrors">("clearErrors");
const setContractsListAction = createAction<
  { list: ContractListType; page: number; type: CONTRACT_LIST_STATE },
  "setContractsList"
>("setContractsList");
const setListLoadingAction = createAction<boolean, "setListLoading">(
  "setListLoading"
);
const deleteContractAction = createAction<string, "deleteContract">(
  "deleteContract"
);
const updateContractSignAction = createAction<string, 'updateContractSign'>('updateContractSign')

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    [setInitedContractAction.type]: (
      state: Draft<ContractState>,
      action: PayloadAction<ContractDataType>
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
      // @ts-ignore
      state.contractErrors = {
        ...state.contractErrors,
        [action.payload.screenType]: {
          ...(state.contractErrors &&
          state.contractErrors[action.payload.screenType]
            ? state.contractErrors[action.payload.screenType]
            : {}),
          ...(state.contractErrors &&
          state.contractErrors[action.payload.screenType] &&
          state.contractErrors[action.payload.screenType][action.payload.field]
            ? state.contractErrors[action.payload.screenType][
                action.payload.field
              ]
            : {}),
          [action.payload.field]: action.payload.message,
        },
      };
    },
    [clearErrorsAction.type]: (state: Draft<ContractState>) => {
      state.contractErrors = undefined;
    },
    [setContractsListAction.type]: (
      state: Draft<ContractState>,
      action: PayloadAction<{
        list: ContractListType;
        page: number;
        type: CONTRACT_LIST_STATE;
      }>
    ) => {
      if (state.listPagination.listType === action.payload.type) {
        state.contracts = state.contracts.concat(action.payload.list);
      } else {
        state.contracts = action.payload.list;
      }

      state.listPagination.page = action.payload.page;
      state.listPagination.listType = action.payload.type;
      state.listPagination.isNextPage = !!action.payload.list.length;
    },
    [setListLoadingAction.type]: (
      state: Draft<ContractState>,
      action: PayloadAction<boolean>
    ) => {
      state.isListLoading = action.payload;
    },
    [deleteContractAction.type]: (
      state: Draft<ContractState>,
      action: PayloadAction<string>
    ) => {
      state.contracts.splice(
        state.contracts.findIndex((contract) => contract.id === action.payload),
        1
      );
    },
    [updateContractSignAction.type]: (
      state: Draft<ContractState>,
      action: PayloadAction<string>
    ) => {
      if (!state.currentContract) {
        return;
      }
      state.currentContract.sign = action.payload
    }
  },
});

export const {
  setInitedContract,
  setScreenData,
  setFieldError,
  clearErrors,
  setContractsList,
  setListLoading,
  deleteContract,
  updateContractSign
} = contractSlice.actions;

export default contractSlice.reducer;

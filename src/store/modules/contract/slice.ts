import {
  createAction,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Contract } from "./types";
import { CONTRACT_SCREEN_TYPES } from "./constants";
import {} from "../contract/types";

interface ContractState {
  currentContract: Contract | undefined;
  inviteEmailsList: string[];
  emailToInvite: string;
}

const initialState: ContractState = {
  currentContract: undefined,
  inviteEmailsList: [],
  emailToInvite: "",
};

type ScreenData = {
  screenType: CONTRACT_SCREEN_TYPES;
  fieldName: string;
  value: unknown;
};

const setInitedContractAction = createAction<string, "setInitedContract">(
  "setInitedContract"
);
const setScreenDataAction = createAction<ScreenData, "setScreenData">(
  "setScreenData"
);
const setEmailToInviteAction = createAction<string, "setEmailToInvite">(
  "setEmailToInvite"
);
const setInviteEmailsListAction = createAction<string[], "setInviteEmails">(
  "setInviteEmails"
);
const clearInviteEmailsListAction = createAction<string[], "clearInviteEmails">(
  "clearInviteEmails"
);

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
    [setEmailToInviteAction.type]: (
      state: Draft<ContractState>,
      action: PayloadAction<string>
    ) => {
      state.emailToInvite = action.payload;
    },
    [setInviteEmailsListAction.type]: (
      state: Draft<ContractState>,
      action: PayloadAction<string[]>
    ) => {
      if (action.payload !== undefined) {
        state.inviteEmailsList = [...state.inviteEmailsList, ...action.payload];
      }
    },
    [clearInviteEmailsListAction.type]: (state: Draft<ContractState>) => {
      state.inviteEmailsList = [];
    },
  },
});

export const {
  setInitedContract,
  setScreenData,
  setEmailToInvite,
  setInviteEmails,
  clearInviteEmails,
} = contractSlice.actions;

export default contractSlice.reducer;

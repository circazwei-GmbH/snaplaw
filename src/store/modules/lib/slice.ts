import {
  createAction,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import { DataListInterface } from "../contract/types";

export interface CarInfoInterface {
    producer: DataListInterface[];
    model: DataListInterface[];
    type: DataListInterface[];
    year: DataListInterface[];
}

interface LibState {
  carInfo: CarInfoInterface;
}

const initialState: LibState = {
  carInfo: {
    producer: [],
    model: [],
    type: [],
    year: [],
},
};

const setCarInfoAction = createAction<CarInfoInterface, "setCarInfo">(
  "setCarInfo"
);

const libSlice = createSlice({
  name: "lib",
  initialState,
  reducers: {
    [setCarInfoAction.type]: (
      state: Draft<LibState>,
      action: PayloadAction<CarInfoInterface>
    ) => {
      state.carInfo = action.payload;
    },
  },
});

export const { setCarInfo } = libSlice.actions;

export default libSlice.reducer;

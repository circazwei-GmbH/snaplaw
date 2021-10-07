import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import FiltersModal from "../FiltersModal";
import { CONTRACT_LIST_STATE } from "../../../../store/modules/contract/types";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { setContractsListFilters } from "../../../../store/modules/contract/slice";
import { requestContractsList } from "../../../../store/modules/contract/action-creators";
import dayjs from "dayjs";
import { CONTRACT_TYPES } from "../../../../store/modules/contract/constants";

const initialState = {
    contract: {
        smartFilters: {
            types: [],
            date: `${new Date("12.11.2010")}`,
        }
    }
}

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};
  
const store = createStore(reduser);

describe("FiltersModal", () => {
  it("Should display apply button", () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <FiltersModal 
          visible 
          onClose={() => {}} 
          switchState={CONTRACT_LIST_STATE.FINALIZED} 
        />
      </Provider>
    );

    expect(getByTestId("CalendarInputDate").props.children).toContain(dayjs(initialState.contract.smartFilters.date).format("DD.MM.YYYY"));
    expect(getByText("my_contracts.smart_filters.apply")).toBeTruthy();
  });
  it("Should call onCLose handler on close", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <FiltersModal 
          visible 
          onClose={handler} 
          switchState={CONTRACT_LIST_STATE.FINALIZED} 
        />
      </Provider>
    );

    fireEvent.press(getByTestId("ModalBackScreen"));
    expect(handler).toBeCalled();
  });
  it("Should dispatch filters and sitchState", () => {
    actions.mockClear();
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <FiltersModal 
          visible 
          onClose={() => {}} 
          switchState={CONTRACT_LIST_STATE.FINALIZED} 
        />
      </Provider>
    );

    fireEvent.press(getByTestId("TypeCheckboxCAR"));
    fireEvent.press(getByText("my_contracts.smart_filters.apply"));
    expect(actions.mock.calls[0][0]).toEqual(
      setContractsListFilters({
        types: [CONTRACT_TYPES.CAR],
        date: initialState.contract.smartFilters.date,
    })
    );
    expect(actions.mock.calls[1][0]).toEqual(
      requestContractsList(CONTRACT_LIST_STATE.FINALIZED, true)
    );
    fireEvent.press(getByTestId("TypeCheckboxCAR"));
    fireEvent.press(getByText("my_contracts.smart_filters.apply"));
    expect(actions.mock.calls[2][0]).toEqual(
      setContractsListFilters({
        types: [],
        date: initialState.contract.smartFilters.date,
    })
    );
    expect(actions.mock.calls[3][0]).toEqual(
      requestContractsList(CONTRACT_LIST_STATE.FINALIZED, true)
    );
  });
  it("Should add contract type in state", () => {
    actions.mockClear();
    const handler = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <FiltersModal 
          visible 
          onClose={handler} 
          switchState={CONTRACT_LIST_STATE.FINALIZED} 
        />
      </Provider>
    );

    fireEvent.press(getByText("my_contracts.smart_filters.apply"));
    expect(actions.mock.calls[0][0]).toEqual(
      setContractsListFilters({
        types: [],
        date: initialState.contract.smartFilters.date,
    })
    );
    expect(actions.mock.calls[1][0]).toEqual(
      requestContractsList(CONTRACT_LIST_STATE.FINALIZED, true)
    );
  });
  it("Should call clean all button handler", () => {
    const { getByText, getByTestId } = render(
        <Provider store={store}>
          <FiltersModal 
            visible 
            onClose={() => {}} 
            switchState={CONTRACT_LIST_STATE.FINALIZED} 
          />
        </Provider>
      );
    expect(getByTestId("CalendarInputDate").props.children).toContain("11.12.2010");
    fireEvent.press(getByText("my_contracts.smart_filters.clear_all"));
    expect(getByTestId("CalendarInputDate").props.children).toContain("");
  });
});

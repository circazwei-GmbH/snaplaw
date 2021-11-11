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
import SearchModal from "../SearchModal";

const initialState = {
  contract: {
    smartFilters: {
      types: [],
      date: `${new Date("12.11.2010")}`,
    },
  },
};

const actions = jest.fn();

const reduser = (state = initialState, action: unknown) => {
  actions(action);
  return initialState;
};

const store = createStore(reduser);

const data = [
  { key: "key1", value: "value1" },
  { key: "key2", value: "value2" },
  { key: "key3", value: "value3" },
  { key: "other", value: "other" },
];

describe("SearchModal", () => {
  it("Should display modal", () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <SearchModal
          visible
          title="title"
          data={data}
          onClose={() => {}}
          onDone={() => {}}
        />
      </Provider>
    );

    data.forEach((el) => expect(getByText(el.value)).toBeTruthy());
  });
  it("Should call onCLose handler on close", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchModal
          visible
          title="title"
          data={data}
          onDone={() => {}}
          onClose={handler}
        />
      </Provider>
    );

    fireEvent.press(getByTestId("CloseButton"));
    expect(handler).toBeCalled();
  });
  it("Should call onCLose handler on close", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchModal
          visible
          title="title"
          data={data}
          onClose={() => {}}
          onDone={handler}
        />
      </Provider>
    );

    fireEvent.press(getByTestId("DoneButton"));
    expect(handler).toBeCalled();
  });
  it("Should search items", () => {
    const { getByTestId, getByText, queryByText } = render(
      <Provider store={store}>
        <SearchModal
          visible
          title="title"
          data={data}
          onClose={() => {}}
          onDone={() => {}}
        />
      </Provider>
    );

    fireEvent.changeText(getByTestId("SearchField"), "value1");
    expect(getByText("value1")).toBeTruthy();
    expect(queryByText("value2")).toBeNull();
  });
  it("Should search items", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchModal
          visible
          title="title"
          data={data}
          onClose={() => {}}
          onDone={() => {}}
        />
      </Provider>
    );

    fireEvent.press(getByTestId("key1"));    
    expect(getByTestId("key1").props.style.backgroundColor).toEqual(`#EFF7FD`);
    
    fireEvent(getByTestId("SearchField"), "focus");     
    expect(getByTestId("key1").props.style.backgroundColor).toBeUndefined();
  });
  // it("Should dispatch filters and sitchState", () => {
  //   actions.mockClear();
  //   const { getByTestId, getByText } = render(
  //     <Provider store={store}>
  //       <FiltersModal
  //         visible
  //         onClose={() => {}}
  //         switchState={CONTRACT_LIST_STATE.FINALIZED}
  //       />
  //     </Provider>
  //   );

  //   fireEvent.press(getByTestId("TypeCheckboxCAR_SALES"));
  //   fireEvent.press(getByText("my_contracts.smart_filters.apply"));
  //   expect(actions.mock.calls[0][0]).toEqual(
  //     setContractsListFilters({
  //       types: [CONTRACT_TYPES.CAR],
  //       date: initialState.contract.smartFilters.date,
  //     })
  //   );
  //   expect(actions.mock.calls[1][0]).toEqual(
  //     requestContractsList(CONTRACT_LIST_STATE.FINALIZED, true)
  //   );
  //   fireEvent.press(getByTestId("TypeCheckboxCAR_SALES"));
  //   fireEvent.press(getByText("my_contracts.smart_filters.apply"));
  //   expect(actions.mock.calls[2][0]).toEqual(
  //     setContractsListFilters({
  //       types: [],
  //       date: initialState.contract.smartFilters.date,
  //     })
  //   );
  //   expect(actions.mock.calls[3][0]).toEqual(
  //     requestContractsList(CONTRACT_LIST_STATE.FINALIZED, true)
  //   );
  // });
  // it("Should add contract type in state", () => {
  //   actions.mockClear();
  //   const handler = jest.fn();
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <FiltersModal
  //         visible
  //         onClose={handler}
  //         switchState={CONTRACT_LIST_STATE.FINALIZED}
  //       />
  //     </Provider>
  //   );

  //   fireEvent.press(getByText("my_contracts.smart_filters.apply"));
  //   expect(actions.mock.calls[0][0]).toEqual(
  //     setContractsListFilters({
  //       types: [],
  //       date: initialState.contract.smartFilters.date,
  //     })
  //   );
  //   expect(actions.mock.calls[1][0]).toEqual(
  //     requestContractsList(CONTRACT_LIST_STATE.FINALIZED, true)
  //   );
  // });
  // it("Should call clean all button handler", () => {
  //   const { getByText, getByTestId } = render(
  //     <Provider store={store}>
  //       <FiltersModal
  //         visible
  //         onClose={() => {}}
  //         switchState={CONTRACT_LIST_STATE.FINALIZED}
  //       />
  //     </Provider>
  //   );
  //   expect(getByTestId("CalendarInputDate").props.children).toContain(
  //     "11.12.2010"
  //   );
  //   fireEvent.press(getByText("my_contracts.smart_filters.clear_all"));
  //   expect(getByTestId("CalendarInputDate").props.children).toContain("");
  // });
});

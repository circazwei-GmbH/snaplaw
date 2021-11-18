import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
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
    const { getByText } = render(
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

    fireEvent.press(getByTestId("DoneButton.title"));
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
 });

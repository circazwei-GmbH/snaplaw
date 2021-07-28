import React from 'react';
import {configureStore, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {render} from "@testing-library/react-native";
import AbstractModal from "../AbstractModal";
import { Provider } from 'react-redux'

const initialState = {
    modal: {
        message: 'Test message',
        actions: [
            {
                name: 'Ok',
                colortype: 'primary'
            },
            {
                name: 'Ok-test',
                colortype: 'primary'
            }
        ]
    }
}

const main = createSlice({
    name: 'main',
    initialState,
    reducers: {
        test: () => {}
    }
})

const store = configureStore({
    reducer: {
        main: main.reducer
    }
})

describe('AbstractModal', () => {
    it('Should displayed', () => {
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <AbstractModal/>
            </Provider>
        )
        expect(getByTestId('modal')).toBeTruthy()
        expect(getByTestId('modal').props.visible).toBeTruthy()
        expect(getByText(initialState.modal.message)).toBeTruthy()
        initialState.modal.actions.forEach((button) => {
            expect(getByText(button.name)).toBeTruthy()
        })
    })
})
import React from 'react';
import {fireEvent, render} from "@testing-library/react-native";
import ForgotPassword from "../ForgotPassword";
import {Provider} from "react-redux";
import store from "../../../store";
import {createStore} from "@reduxjs/toolkit";
import {FORGOT_PASSWORD_REQUESTED} from "../../../store/modules/auth/action-creators";

const initialState = {
    auth: {
        forgotPassword: {
            error: ''
        }
    }
}

const actionType = jest.fn()

const reducer = (store = initialState, action: any) => {
    actionType(action.type)
    return store
}

const customStore = createStore(reducer)

describe('ForgotPassword', () => {
    it('Should display input', () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store} >
                <ForgotPassword />
            </Provider>
        )

        expect(getByText('forgot_password.title')).toBeTruthy()
        expect(getByPlaceholderText('forgot_password.input')).toBeTruthy()
        expect(getByText('forgot_password.send')).toBeTruthy()
    })

    it('Should validate input', () => {
        const { queryByText, getByText, getByPlaceholderText } = render(
            <Provider store={store} >
                <ForgotPassword />
            </Provider>
        )

        fireEvent.changeText(getByPlaceholderText('forgot_password.input'), 'test.mail.not.valid')
        fireEvent.press(getByText('forgot_password.send'))

        expect(getByText('forgot_password.errors.email_not_valid')).toBeTruthy()

        fireEvent.changeText(getByPlaceholderText('forgot_password.input'), 'test@valid.mail')
        expect(queryByText('forgot_password.errors.email_not_valid')).not.toBeTruthy()
    })

    it('Should dispatch event', () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={customStore} >
                <ForgotPassword />
            </Provider>
        )

        fireEvent.changeText(getByPlaceholderText('forgot_password.input'), 'test@valid.mail')
        fireEvent.press(getByText('forgot_password.send'))
        expect(actionType).toBeCalledWith(FORGOT_PASSWORD_REQUESTED)
    })
})
import React from 'react'
import {fireEvent, render} from "@testing-library/react-native";
import {Provider} from "react-redux";
import store from "../../../store";
import ChangePassword from "../ChangePassword";
import {createStore} from "@reduxjs/toolkit";
import {CHANGE_PASSWORD_REQUESTED} from "../../../store/modules/auth/action-creators";

const routeProp = {
    params: {
        token: 'token',
        email: 'test@mail.com'
    }
}

const actionType = jest.fn()

const initialState = {
    auth: {
        changePassword: {
            error: ''
        }
    }
}

const reducer = (store = initialState, action: any) => {
    actionType(action.type)
    return store
}

const customStore = createStore(reducer)


describe('ChangePassword', () => {
    it('Should display fields', () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store} >
                <ChangePassword route={routeProp} />
            </Provider>
        )
        expect(getByText('change_password.title')).toBeTruthy()
        expect(getByPlaceholderText('change_password.fields.new_password')).toBeTruthy()
        expect(getByText('change_password.description')).toBeTruthy()
        expect(getByPlaceholderText('change_password.fields.confirm_password')).toBeTruthy()
        expect(getByText('change_password.save')).toBeTruthy()
    })
    it('Should validate empty and less then 6 chars', () => {
        const { getByText, getAllByText, getByPlaceholderText } = render(
            <Provider store={store} >
                <ChangePassword route={routeProp} />
            </Provider>
        )
        fireEvent.changeText(getByPlaceholderText('change_password.fields.new_password'), 'test')
        fireEvent.press(getByText('change_password.save'))
        expect(getAllByText('change_password.errors.password_length')).toHaveLength(2)
    })
    it('Should validate field matching', () => {
        const { getByText, queryByText, getByPlaceholderText } = render(
            <Provider store={store} >
                <ChangePassword route={routeProp} />
            </Provider>
        )
        fireEvent.changeText(getByPlaceholderText('change_password.fields.new_password'), 'testpassword')
        fireEvent.changeText(getByPlaceholderText('change_password.fields.confirm_password'), 'testpassword1')
        fireEvent.press(getByText('change_password.save'))
        expect(getByText('change_password.errors.confirm_password')).toBeTruthy()

        fireEvent.changeText(getByPlaceholderText('change_password.fields.confirm_password'), 'testpassword')
        expect(queryByText('change_password.errors.confirm_password')).not.toBeTruthy()
    })
    it('Should dispatch event', () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={customStore} >
                <ChangePassword route={routeProp} />
            </Provider>
        )
        fireEvent.changeText(getByPlaceholderText('change_password.fields.new_password'), 'testpassword')
        fireEvent.changeText(getByPlaceholderText('change_password.fields.confirm_password'), 'testpassword')
        fireEvent.press(getByText('change_password.save'))
        expect(actionType).toBeCalledWith(CHANGE_PASSWORD_REQUESTED)
    })
})
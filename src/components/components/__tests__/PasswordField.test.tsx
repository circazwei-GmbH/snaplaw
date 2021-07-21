import React from 'react';
import {fireEvent, render} from "@testing-library/react-native";
import PasswordField from "../PasswordField";

const testText = 'TEXT'

describe('PasswordField', () => {
    it('Should view', () => {
        const { getByPlaceholderText } = render(<PasswordField value="test" placeholder="TestField" onChange={jest.fn} />);
        expect(getByPlaceholderText('TestField')).toBeTruthy()
    })
    it('Should call prop-function onPress', () => {
        const handler = jest.fn()
        const { getByPlaceholderText } = render(<PasswordField value="test" placeholder="TestField" onChange={handler} />)
        fireEvent.changeText(getByPlaceholderText('TestField'), testText)
        expect(handler).toBeCalled()
        expect(handler).toBeCalledWith(testText)
    })
})
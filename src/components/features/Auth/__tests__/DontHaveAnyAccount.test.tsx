import React from 'react';
import {fireEvent, render} from "@testing-library/react-native";
import DontHaveAnyAccount from "../DontHaveAnyAccount";

const TEST_TEXT_LINK = 'test.link.text'
const TEST_TEXT_MESSAGE = 'test.message.text'

describe('DontHaveAnyAccount', () => {
    it('Should display the message', () => {
        const { getByText } = render(<DontHaveAnyAccount
            linkHandler={jest.fn()}
            linkText={TEST_TEXT_LINK}
            messageTextKey={TEST_TEXT_MESSAGE}
        />);
        expect(getByText(TEST_TEXT_LINK)).toBeTruthy()
        expect(getByText(TEST_TEXT_MESSAGE)).toBeTruthy()
    })
    it('Should call link handler', () => {
        const handler = jest.fn()
        const { getByText } = render(<DontHaveAnyAccount
            linkHandler={handler}
            linkText={TEST_TEXT_LINK}
            messageTextKey={TEST_TEXT_MESSAGE}
        />);
        fireEvent.press(getByText(TEST_TEXT_LINK))
        expect(handler).toBeCalled()
    })
})
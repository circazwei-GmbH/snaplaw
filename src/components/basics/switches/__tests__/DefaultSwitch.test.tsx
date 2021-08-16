import React from "react";
import {fireEvent, render} from "@testing-library/react-native";
import DefaultSwitch from "../DefaultSwitch";

const SWITCH_NAME = 'switch-name';

describe('DefaultSwitch', () => {
    it('Text should be displayed', () => {
        const {getByText} = render(<DefaultSwitch title={SWITCH_NAME} value={true} onChange={() => {}} />)
        expect(getByText(SWITCH_NAME)).toBeTruthy()
    })
    it('Should toggle function', () => {
        const handler = jest.fn()
        const { getByTestId } = render(<DefaultSwitch title={SWITCH_NAME} value={false} onChange={handler} />)
        fireEvent(getByTestId(`Switch.${SWITCH_NAME}`), 'onValueChange')
        expect(handler).toBeCalled()
    })
})
import React from 'react'
import {fireEvent, render} from "@testing-library/react-native";
import Checkbox from "../Checkbox";

const TITLE_TEXT = 'text-title'

describe('Checkbox', () => {
    it('Should title display', () => {
        const { getByText } = render(<Checkbox isChecked={true} onChange={jest.fn()} text={TITLE_TEXT} />)

        expect(getByText(TITLE_TEXT)).toBeTruthy()
    })
    it('Should call handler', () => {
        const handler = jest.fn()
        const { getByText } = render(<Checkbox isChecked={true} onChange={handler} text={TITLE_TEXT} />)
        fireEvent.press(getByText(TITLE_TEXT))
        expect(handler).toBeCalled()
    })
})
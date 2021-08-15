import React from 'react'
import {fireEvent, render} from "@testing-library/react-native";
import Menu, {ButtonType} from "../Menu";

const BUTTONS: ButtonType[] = [
    {
        title: 'testTtile',
        handler: jest.fn()
    }
]

describe('Menu', () => {
    it('Should display cancel and provided buttons', () => {
        const { getByText } = render(<Menu visible onClose={() => {}} buttons={BUTTONS} />)

        expect(getByText(BUTTONS[0].title)).toBeTruthy()
        expect(getByText('menu.cancel')).toBeTruthy()
    })
    it('Should call onCLose handler on close', () => {
        const handler = jest.fn()
        const { getByText } = render(
            <Menu visible={true} onClose={handler} buttons={BUTTONS} />
        )

        fireEvent.press(getByText('menu.cancel'))
        expect(handler).toBeCalled()
    })
    it('Should call button handler', () => {
        const { getByText } = render(
            <Menu visible onClose={() => {}} buttons={BUTTONS} />
        )

        fireEvent.press(getByText(BUTTONS[0].title))
        expect(BUTTONS[0].handler).toBeCalled()
    })
})
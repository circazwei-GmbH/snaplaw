import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from "../Button";

describe('Button', () => {
    it('Button view', () => {
        const handler = jest.fn()
        const { findByText } = render(<Button text={'Test'} onPress={handler}/>)
        expect(findByText('Test')).toBeTruthy()
    });
    it('Button test click', async () => {
        const handler = jest.fn()
        const { findByText } = render(<Button text={'Test'} onPress={handler}/>)
        fireEvent(await findByText('Test'), 'press')
        expect(handler).toBeCalled()
    });
})
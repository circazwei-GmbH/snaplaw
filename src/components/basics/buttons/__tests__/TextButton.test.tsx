import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextButton from "../TextButton";

describe('TextButton', () => {
    it('TextButton view', () => {
        const handler = jest.fn()
        const { getByText } = render(
          <TextButton text={'Test'} onPress={handler} type="right" />
        )
        expect(getByText('Test')).toBeTruthy()
    });
    it('TextButton click test', async () => {
        const handler = jest.fn()
        const { getByText } = render(
          <TextButton text={'Test'} onPress={handler} type="right" />
        )
        
        fireEvent(getByText('Test'), 'press')
        expect(handler).toBeCalled()
    });
})
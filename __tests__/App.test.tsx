import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App'

test('initial', () => {
    const { getByText } = render(
        <App />
    );
    const title = getByText('#Snaplaw')
    expect(title).toBeTruthy()
})
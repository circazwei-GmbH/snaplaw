import React from 'react';
import Welcome from '../../../../src/components/pages/Welcome'
import {render} from '@testing-library/react-native';

describe('Welcome', () => {
    test('welcome text there is', async () => {
        const { getByA11yLabel } = render(<Welcome/>)

        const text = await getByA11yLabel('welcome-to-snaplaw')
        expect(text).toBeTruthy()
    })
    test('welcome image there is', async () => {
        const { getByA11yLabel } = render(<Welcome/>)

        const image = await getByA11yLabel('welcome-image')
        expect(image).toBeTruthy()
    })
    test('welcome actions block there is', async () => {
        const { getByA11yLabel } = render(<Welcome/>)

        const image = await getByA11yLabel('actions')
        expect(image).toBeTruthy()
    })
})
import React from 'react'
import {render} from "@testing-library/react-native";
import ImageAndText from "../ImageAndText";

const TEST_TEXT = 'test.text'

describe('ImageAndText', () => {
    it('Should display text', () => {
        const { getByText, getByA11yLabel } = render(<ImageAndText image={require('/assets/verification.png')} text={TEST_TEXT} />)
        expect(getByText(TEST_TEXT)).toBeTruthy();
        const image = getByA11yLabel('asset-image');
        expect(image.props.source).toEqual({})
    })
})
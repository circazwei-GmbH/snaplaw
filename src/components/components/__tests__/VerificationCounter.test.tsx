import React from 'react'
import {render} from "@testing-library/react-native";
import VerificationCounter from "../VerificationCounter";

describe('VerificationCounter', () => {
    it('Should display text', () => {
        const { getByText } = render(<VerificationCounter sizeSmall />)
        expect(getByText('my_profile.verified_gray')).toBeTruthy()
        expect(getByText('0 my_profile.verified_black')).toBeTruthy()
    })
})
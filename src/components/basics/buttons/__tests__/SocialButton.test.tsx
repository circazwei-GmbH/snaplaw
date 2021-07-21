import React from 'react'
import { render } from '@testing-library/react-native';
import SocialButton from "../SocialButton";
import {View} from "react-native";

const Child = () => (
    <View data-testID="child.test.element" />
)

describe('SocialButton', () => {
    it('SocialButton smoke', () => {
        const { findByTestId } = render(<SocialButton><Child /></SocialButton>)
        expect(findByTestId('child.test.element')).toBeTruthy()
    })
})
import React from 'react'
import { render } from '@testing-library/react-native';
import SocialButton from "../SocialButton";
import {View} from "react-native";

const Child = () => (
    <View accessibilityHint="child.test.element" />
)

describe('SocialButton', () => {
    it('SocialButton smoke', () => {
        const elem = render(<SocialButton><Child /></SocialButton>)
        expect(elem.getAllByA11yHint('child.test.element')).toBeTruthy()
    })
})
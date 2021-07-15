import React from 'react';
import Button from '../../../../../src/components/basics/buttons/Button'
import { render, fireEvent, act, } from '@testing-library/react-native';
import {NativeRouter, Route} from "react-router-native";
import {Text, View} from "react-native";

const arrayStyleFinder = (styles: Array<any>, property: string): string | number | null => {
    const style = styles.find(style => style[property])
    if (!style) {
        return null;
    }

    return style[property]
}

const mainComponent = () => (
    <View>
        <Text>mainComponent</Text>
    </View>
)

const secondComponent = () => (
    <View>
        <Text>secondComponent</Text>
    </View>
)

describe('Button component', () => {
    test('Button displayed', async () => {
        const { findByText } = render(
            <NativeRouter>
                <Button to="/test-route" text="testButton" />
            </NativeRouter>
        )

        const button = await findByText('testButton')
        expect(button).toBeTruthy()
        expect(arrayStyleFinder(button.props.style, 'opacity')).toBeNull()
    })
    test('Button pressed', async () => {
        const { findByText } = render(
            <NativeRouter data-test-id="router">
                <Button to="/test-route" text="testButton" />
                <Route exact path="/" component={mainComponent} />
                <Route path="/test-route" component={secondComponent} />
            </NativeRouter>
        )
        const button = await findByText('testButton')
        const mainScreen = await findByText('mainComponent')
        expect(mainScreen).toBeTruthy()

        fireEvent.press(button)

        const secondScreen = await findByText('secondComponent')
        expect(secondScreen).toBeTruthy()
    })
})

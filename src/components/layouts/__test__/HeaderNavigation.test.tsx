import React from 'react';
import {Text, View} from "react-native";
import {fireEvent, render} from "@testing-library/react-native";
import HeaderNavigation from "../HeaderNavigation";
import * as RootNavigation from '../../../router/RootNavigation'

jest.mock('../../../router/RootNavigation')

describe('HeaderNavigation', () => {
    it('Sould display name and children', () => {
        const Child = () => (<View>
            <Text>SomeTestChild</Text>
        </View>)

        const { getByText } = render(<HeaderNavigation pageName="TestName">
            <Child/>
        </HeaderNavigation>)

        expect(getByText('SomeTestChild')).toBeTruthy()
        expect(getByText('TestName')).toBeTruthy()
    })

    it('Sould navigate back', () => {
        const Child = () => (<View>
            <Text>SomeTestChild</Text>
        </View>)

        const { getByTestId } = render(<HeaderNavigation pageName="TestName">
            <Child/>
        </HeaderNavigation>)

        fireEvent.press(getByTestId('HeaderNavigation.back'))
        expect(RootNavigation.pop).toBeCalled()
    })
})
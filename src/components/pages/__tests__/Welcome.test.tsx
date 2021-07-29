import React from 'react';
import {render} from "@testing-library/react-native";
import {NavigationContainer} from "@react-navigation/native";
import Welcome from '../Welcome'
import {createStackNavigator} from "@react-navigation/stack";

describe('Welcome', () => {
    it('Should display image', () => {
        const Stack = createStackNavigator();
        const { getByA11yLabel, getByText } = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Welcome" component={Welcome} />
                </Stack.Navigator>
            </NavigationContainer>
        )

        expect(getByA11yLabel('welcome-to-snaplaw')).toBeTruthy()
        expect(getByA11yLabel('welcome-image')).toBeTruthy()
        expect(getByText('welcome.sign_in')).toBeTruthy()
        expect(getByText('welcome.sign_up')).toBeTruthy()
    })
})
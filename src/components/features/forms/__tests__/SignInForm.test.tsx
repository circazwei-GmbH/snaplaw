import React from 'react';
import {fireEvent, render} from "@testing-library/react-native";
import SignInForm from "../SignInForm";
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from "../../../../router/RouterTypes";
import {SignInFormInterface} from "../SignInForm";
import {email, length} from "../../../../validations/default";
import {NavigationContainer} from "@react-navigation/native";
import {Text, View} from "react-native";

type ParentProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignIn'>
}

describe('SignInForm', () => {
    let Stack = createStackNavigator();
    let form: SignInFormInterface;
    beforeEach(() => {
        Stack = createStackNavigator();
        form = {
            email: {
                value: 'testEmail',
                error: '',
                displayError: false,
                validators: [email('Should be an email pattern')]
            },
            password: {
                value: '',
                error: '',
                displayError: false,
                validators: [length('Should be at least 6 chars', 6)]
            }
        }
    })
    it('Should fields exists', async () => {
        const Parent = ({navigation} : ParentProps) => (
            <SignInForm navigation={navigation} form={form} fieldChangeHandler={jest.fn()} />
        )
        const Forgot = () => (
            <View><Text>TestScreen</Text></View>
        )

        const { getByPlaceholderText, getByText, queryByText } = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="SignIn" component={Parent} />
                    <Stack.Screen name="Forgot" component={Forgot} />
                </Stack.Navigator>
            </NavigationContainer>
        )

        expect(queryByText('TestScreen')).not.toBeTruthy()
        expect(getByPlaceholderText('sign_in.email_field')).toBeTruthy()
        expect(getByPlaceholderText('sign_in.email_field').props.value).toEqual(form.email.value)
        expect(getByPlaceholderText('sign_in.password_field')).toBeTruthy()
        expect(getByPlaceholderText('sign_in.password_field').props.value).toEqual(form.password.value)
        expect(getByText('sign_in.forgot_password')).toBeTruthy()
        fireEvent.press(getByText('sign_in.forgot_password'))
        expect(getByText('TestScreen')).toBeTruthy()
    })
    it('Should handler called', () => {
        const handler = jest.fn()
        const Parent = ({navigation} : ParentProps) => (
            <SignInForm navigation={navigation} form={form} fieldChangeHandler={handler} />
        )

        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="SignIn" component={Parent} />
                </Stack.Navigator>
            </NavigationContainer>
        )

        const TEST_EMAIL = 'test-email';
        const TEST_PASSWORD = 'test-password';

        fireEvent.changeText(getByPlaceholderText('sign_in.email_field'), TEST_EMAIL)
        expect(handler).toBeCalledWith('email', TEST_EMAIL)
        handler.mockClear()
        fireEvent.changeText(getByPlaceholderText('sign_in.password_field'), TEST_PASSWORD)
        expect(handler).toBeCalledWith('password', TEST_PASSWORD)
    })
})
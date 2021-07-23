import React from 'react';
import {fireEvent, render} from "@testing-library/react-native";
import SignUpForm, {SignUpFormInterface} from "../SignUpForm";
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from "../../../../router/RouterTypes";
import {email, length} from "../../../../validations/default";
import {NavigationContainer} from "@react-navigation/native";

type ParentProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignUp'>
}

describe('SignUpForm', () => {
    let Stack = createStackNavigator();
    let form: SignUpFormInterface;
    beforeEach(() => {
        Stack = createStackNavigator();
        form = {
            name: {
                value: 'testName',
                error: '',
                displayError: false,
                validators: [length('Field required', 1)]
            },
            email: {
                value: 'testEmail',
                error: '',
                displayError: false,
                validators: [email('Should be an email pattern')]
            },
            password: {
                value: 'testPassword',
                error: '',
                displayError: false,
                validators: [length('Should be at least 6 chars', 6)]
            }
        }
    })
    it('Should fields exists', async () => {
        const Parent = ({navigation} : ParentProps) => (
            <SignUpForm navigation={navigation} form={form} fieldChangeHandler={jest.fn()} />
        )

        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="SignUpForm" component={Parent} />
                </Stack.Navigator>
            </NavigationContainer>
        )

        expect(getByPlaceholderText('sign_up.name_field')).toBeTruthy()
        expect(getByPlaceholderText('sign_up.name_field').props.value).toEqual(form.name.value)
        expect(getByPlaceholderText('sign_up.email_field')).toBeTruthy()
        expect(getByPlaceholderText('sign_up.email_field').props.value).toEqual(form.email.value)
        expect(getByPlaceholderText('sign_up.password_field')).toBeTruthy()
        expect(getByPlaceholderText('sign_up.password_field').props.value).toEqual(form.password.value)
    })
    it('Should handler called', () => {
        const handler = jest.fn()
        const Parent = ({navigation} : ParentProps) => (
            <SignUpForm navigation={navigation} form={form} fieldChangeHandler={handler} />
        )

        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="SignIn" component={Parent} />
                </Stack.Navigator>
            </NavigationContainer>
        )

        const TEST_NAME = 'test-name';
        const TEST_EMAIL = 'test-email-sign-up';
        const TEST_PASSWORD = 'test-password-sign-up';

        fireEvent.changeText(getByPlaceholderText('sign_up.name_field'), TEST_NAME)
        expect(handler).toBeCalledWith('name', TEST_NAME)
        handler.mockClear()
        fireEvent.changeText(getByPlaceholderText('sign_up.email_field'), TEST_EMAIL)
        expect(handler).toBeCalledWith('email', TEST_EMAIL)
        handler.mockClear()
        fireEvent.changeText(getByPlaceholderText('sign_up.password_field'), TEST_PASSWORD)
        expect(handler).toBeCalledWith('password', TEST_PASSWORD)
    })
})
import React from 'react';
import { View, StyleSheet } from "react-native";
import TextField from "../../components/TextField";
import PasswordField from '../../components/PasswordField'
import Link from "../../basics/links/link";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList, AUTH_ROUTE} from "../../../router/AuthRouterTypes";
import { ValidatorInterface } from '../../../validations/default';
import { t } from 'i18n-js'

// TODO move to abstract place because used in SignUp
export interface FieldInterface {
    value: string,
    error: string,
    displayError: boolean,
    validators: Array<ValidatorInterface>
}

export interface SignInFormInterface {
    email: FieldInterface,
    password: FieldInterface
}

type SignInFormProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignIn'>,
    form: SignInFormInterface,
    fieldChangeHandler: Function,
}

export default function SignInForm({navigation, fieldChangeHandler, form} : SignInFormProps) {
    return (
        <>
            <View>
                <TextField
                    placeholder={t('sign_in.email_field')}
                    textContentType="username"
                    fixed
                    keyboardType="email-address"
                    errorMessage={form.email.error}
                    value={form.email.value}
                    onChangeFunction={(text) => fieldChangeHandler('email', text)}
                />
            </View>
            <View style={styles.password}>
                <PasswordField
                    placeholder={t('sign_in.password_field')}
                    errorMessage={form.password.error}
                    value={form.password.value}
                    onChange={(text) => fieldChangeHandler('password', text)}
                />
            </View>
            <View>
                <Link
                    style={styles.forgotLinkContainer}
                    text={t('sign_in.forgot_password')}
                    onPress={() => { navigation.navigate(AUTH_ROUTE.FORGOT) }}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    password: {
        marginTop: 16
    },
    forgotLinkContainer: {
        textAlign: 'right',
        marginTop: 14
    }
})
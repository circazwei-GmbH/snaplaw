import React from 'react';
import { View, StyleSheet } from "react-native";
import TextField from "../../components/TextField";
import PasswordField from '../../components/PasswordField'
import Link from "../../basics/links/link";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../router/RouterTypes";
import { email, ValidatorInterface } from '../../../validations/default';

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
            <View style={styles.email}>
                <TextField placeholder="Email" textContentType="username" fixed errorMessage={form.email.error} value={form.email.value} onChangeFunction={(text) => fieldChangeHandler('email', text)} />
            </View>
            <View style={styles.password}>
                <PasswordField placeholder="Password" errorMessage={form.password.error} value={form.password.value} onChange={(text) => fieldChangeHandler('password', text)} icon="visibility-off" />
            </View>
            <View >
                <Link style={styles.forgotLinkContainer} text="Forgot password?" onPress={() => { navigation.navigate('Forgot') }}/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    email: {

    },
    password: {
        marginTop: 16
    },
    forgotLinkContainer: {
        textAlign: 'right',
        marginTop: 14
    }
})
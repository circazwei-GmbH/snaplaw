import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../router/RouterTypes";
import TextField from "../../components/TextField";
import { FieldInterface } from './SignInForm'
import PasswordField from '../../components/PasswordField'

export interface SignUpFormInterface {
    name: FieldInterface,
    email: FieldInterface,
    password: FieldInterface
}

type SignUpFormProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignUp'>,
    form: SignUpFormInterface,
    fieldChangeHandler: Function
}

export default function SignUpForm({fieldChangeHandler, form} : SignUpFormProps) {
    return (
        <View style={styles.container}>
            <View>
                <TextField
                    placeholder="Name"
                    onChangeFunction={(text: string) => fieldChangeHandler('name', text)}
                    value={form.name.value}
                    fixed
                    errorMessage={form.name.error}
                />
            </View>
            <View style={styles.field}>
                <TextField
                    placeholder="Email"
                    onChangeFunction={(text: string) => fieldChangeHandler('email', text)}
                    value={form.email.value}
                    errorMessage={form.email.error}
                />
            </View>
            <View style={styles.field}>
                <PasswordField
                    placeholder="Password"
                    onChange={(text: string) => fieldChangeHandler('password', text)}
                    value={form.name.value}
                    errorMessage={form.password.error}
                    icon="visibility-off"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10
    },
    field: {
        marginTop: 8
    }
})
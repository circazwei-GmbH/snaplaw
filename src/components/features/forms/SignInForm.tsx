import React from 'react';
import { View, StyleSheet } from "react-native";
import TextField from "../../components/TextField";
import PasswordField from '../../components/PasswordField'
import Link from "../../basics/links/link";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../router/Router";

type SignInFormProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignIn'>
}

export default function SignInForm({navigation} : SignInFormProps) {
    return (
        <>
            <View style={styles.email}>
                <TextField placeholder="Email" fixed />
            </View>
            <View style={styles.password}>
                <PasswordField placeholder="Password" icon="visibility-off" />
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
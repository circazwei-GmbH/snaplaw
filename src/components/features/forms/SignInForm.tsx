import React from 'react';
import { View, StyleSheet } from "react-native";
import TextField from "../../components/TextField";
import PasswordField from '../../components/PasswordField'
import Link from "../../basics/links/link";

export default function SignInForm() {
    return (
        <>
            <View style={styles.email}>
                <TextField placeholder="Email" fixed />
            </View>
            <View style={styles.password}>
                <PasswordField placeholder="Password" icon="visibility-off" />
            </View>
            <View >
                <Link style={styles.forgotLinkContainer} text="Forgot password?" />
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
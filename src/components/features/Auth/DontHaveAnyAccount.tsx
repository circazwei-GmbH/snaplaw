import React from 'react';
import {Text, View, StyleSheet, GestureResponderEvent} from "react-native";
import Link from "../../basics/links/link";

type AuthActionsProps = {
    linkHandler: (event: GestureResponderEvent) => void,
    linkText: string
}

export default function DontHaveAnyAccount({linkHandler, linkText} : AuthActionsProps) {
    return (
        <View>
            <Text style={styles.dontHaveAccount}>
                Don't have any account?
            </Text>
            <Link style={styles.signUpLink} text={linkText} onPress={linkHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    dontHaveAccount: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'P',
    },
    signUpLink: {
        fontSize: 16,
        textAlign: 'center'
    }
})
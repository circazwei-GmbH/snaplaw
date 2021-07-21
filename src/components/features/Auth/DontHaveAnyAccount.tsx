import React from 'react';
import {Text, View, StyleSheet, GestureResponderEvent} from "react-native";
import Link from "../../basics/links/link";
import {t} from 'i18n-js'

type AuthActionsProps = {
    linkHandler: (event: GestureResponderEvent) => void,
    linkText: string,
    messageTextKey: string
}

export default function DontHaveAnyAccount({linkHandler, linkText, messageTextKey} : AuthActionsProps) {
    return (
        <View>
            <Text style={styles.dontHaveAccount}>
                {t(messageTextKey)}
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
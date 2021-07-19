import React from 'react';
import { View, StyleSheet } from "react-native";
import MainHeadline from "../basics/typography/MainHeadline";
import AuthLayout from "../layouts/AuthLayout";
import SignInForm from "../features/forms/SignInForm";
import Button from "../basics/buttons/Button";

export default function SignIn() {
    return (
        <View style={{
            flex: 1,
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'column'}}
        >
            <AuthLayout>
                <View style={styles.container}>
                    <View style={styles.width100}>
                        <View style={styles.headline}>
                            <MainHeadline text="Sign In" />
                        </View>
                        <View style={styles.width100}>
                            <SignInForm />
                        </View>
                    </View>
                    <View style={[styles.width100, styles.actions]}>
                        <View style={styles.width100}>
                            <Button text="Sign In" type="primary" onPress={() => console.log('yya')} />
                        </View>
                        <View>
                            <View>
                            </View>
                        </View>
                    </View>
                </View>

            </AuthLayout>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: "column",
        alignSelf: 'stretch'
    },
    headline: {
        marginBottom: 10,
    },
    width100: {
        width: '100%'
    },
    actions: {
        paddingHorizontal: 21
    }
})
import React from 'react';
import {Text, View, StyleSheet, Image} from "react-native";
import {Link} from "react-router-native";
import Button from '../basics/buttons/Button'

export default function Welcome() {
    return (
        <View style={styles.container}>
            <Text style={styles.headline}>Welcome to Snaplaw</Text>
            <Image source={require('../../../assets/welcome.png')} />
            <View style={styles.actions}>
                <Button text="Sign in" to="signin" style={styles.signInButton} type="primary" />
                <Button text="Sign up" to="signup" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFF7FD',
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    headline: {
        fontSize: 48,
        color: '#1696E2',
        textAlign: "center",
        textAlignVertical: 'center',
        marginBottom: -40,
        marginTop: 40,
        fontFamily: 'OS-B'
    },
    actions: {
        width: '85%',
    },
    signInButton: {
        marginBottom: 20
    }
})
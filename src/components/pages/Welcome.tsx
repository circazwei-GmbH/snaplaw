import React from 'react'
import { Text, View, StyleSheet, Image } from "react-native"
import Button from '../basics/buttons/Button'
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList, ROUTE } from "../../router/RouterTypes"
import i18n from 'i18n-js'

type WelcomeProp = {
    navigation: StackNavigationProp<RootStackParamList, 'Welcome'>
}

export default function Welcome({ navigation }: WelcomeProp) {
    return (
        <View style={styles.container}>
            <Text accessibilityLabel="welcome-to-snaplaw" style={styles.headline}>{i18n.t('welcome.headline')}</Text>
            <Image accessibilityLabel="welcome-image" source={require('../../../assets/welcome.png')} />
            <View style={styles.actions} accessibilityLabel="actions">
                <Button text={i18n.t('welcome.sign_in')} onPress={() => navigation.navigate(ROUTE.SIGNIN)} style={styles.signInButton} type="primary" />
                <Button text={i18n.t('welcome.sign_up')} onPress={() => navigation.navigate(ROUTE.SIGNUP)} />
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
        fontSize: 32,
        width: 240,
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
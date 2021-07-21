import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import Button from "../basics/buttons/Button";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../router/Router'

type ForgotPasswordProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Forgot'>
}

export default function ForgotPassword({ navigation } : ForgotPasswordProps) {
    return (
        <View>
            <Text style={styles.text}>Forgot Password</Text>
            <Button text="Back" onPress={() => {navigation.pop()}} />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 48,
        marginTop: 50,
        textAlign: "center"
    }
})
import React from 'react'
import {StyleSheet, Text, View} from "react-native";

export default function SignArea() {

    return (
        <View style={styles.container}>
            <Text>Sign Area</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#BBD1DE',
        borderRadius: 10,
        backgroundColor: '#fff',
        height: '80%'
    }
})
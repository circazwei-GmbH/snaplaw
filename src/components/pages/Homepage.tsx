import React from 'react'
import { Text, View, StyleSheet } from "react-native"

export default function Homepage() {
    return (
        <View>
            <Text style={styles.test}>Homepage</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    test: {
        marginTop: 50,
        textAlign: 'center',
        fontSize: 30
    }
})
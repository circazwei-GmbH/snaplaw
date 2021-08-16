import React from 'react';
import {Text, View, StyleSheet} from "react-native";

export default function MyContracts() {
    return (
        <View>
            <Text style={styles.test}>My Contracts</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    test: {
        marginTop: 50,
        textAlign: 'center',
        fontSize: 30
    },
})
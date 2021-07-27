import React from 'react'
import {View, StyleSheet} from "react-native";
import NumberInput from '../basics/NumberInput'

export default function NumberInputComponent() {
    return (
        <View style={styles.container}>
            <NumberInput style={[styles.margin, styles.resetMarginLeft]} />
            <NumberInput style={[styles.margin]} />
            <NumberInput style={[styles.margin]} />
            <NumberInput style={[styles.margin, styles.resetMarginRight]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    margin: {
        marginHorizontal: 4
    },
    resetMarginLeft: {
        marginLeft: 0
    },
    resetMarginRight: {
        marginRight: 0
    }
})
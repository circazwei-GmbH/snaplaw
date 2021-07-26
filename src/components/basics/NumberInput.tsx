import React from 'react'
import {TextInput, StyleSheet} from "react-native";

type NumberInputProps = {
    style: StyleSheet
}

export default function NumberInput({style}: NumberInputProps) {
    return (
        <TextInput style={[styles.input, style]} />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(22, 150, 226, 0.08)',
        height: 51,
        width: 61,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#1696E2',
        fontFamily: 'P',
        fontSize: 32,
        textAlign: "center"
    }
})
import React from "react";
import {Text, StyleSheet} from "react-native";

type DefaultTextProps = {
    text: string,
    style?: any
}

export default function DefaultText({text, style} : DefaultTextProps) {
    return (
        <Text style={[styles.text, style]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'P',
        color: '#202020',
        fontSize: 17,
    }
})
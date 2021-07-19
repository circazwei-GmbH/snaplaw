import React from 'react';
import {View, Text, StyleSheet} from "react-native";

interface LinkPropsInterface {
    text: string,
    style?: object
}

export default function Link({ text, style } : LinkPropsInterface) {
    return (
        <View>
            <Text style={[styles.link, style]}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    link: {
        fontFamily: 'OS-SB',
        fontSize: 15,
        color: '#1696E2'
    }
})
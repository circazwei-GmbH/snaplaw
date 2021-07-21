import React from 'react';
import {Text, View, StyleSheet} from "react-native";

interface MainHeadlinePropsInterface {
    text: string;
}

export default function MainHeadline({ text } : MainHeadlinePropsInterface) {
    return (
        <View>
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'OS-SB',
        fontSize: 32,
        color: '#1696E2',
        textAlign: 'center',
    }
})
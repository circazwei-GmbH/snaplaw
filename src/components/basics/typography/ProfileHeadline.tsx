import React from 'react'
import { Text, View, StyleSheet } from "react-native"

interface ProfileHeadlinePropsInterface {
    text: string
}

export default function ProfileHeadline({ text }: ProfileHeadlinePropsInterface) {
    return (
        <>
            <Text style={styles.text}>
                {text}
            </Text>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'OS-SB',
        fontSize: 17,
        color: '#202020',
        textAlign: 'center',
    }
})
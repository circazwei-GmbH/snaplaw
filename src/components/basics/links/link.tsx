import React from 'react';
import { Text, StyleSheet, Pressable} from "react-native";

interface LinkPropsInterface {
    text: string;
    style?: object;
    onPress?: Function | null;
}

export default function Link({ text, style, onPress = null } : LinkPropsInterface) {
    const onPressHandler = () => {
        if (onPress) {
            onPress();
        }
    }

    return (
        <Pressable onPress={onPressHandler}>
            <Text style={[styles.link, style]}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    link: {
        fontFamily: 'OS-SB',
        fontSize: 15,
        color: '#1696E2'
    }
})
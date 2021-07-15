import React, {useState} from 'react';
import { useHistory } from "react-router-native";
import { Pressable, StyleSheet, Text } from 'react-native'

interface ButtonPropsInterface {
    text: string;
    to: string;
    style?: object,
    type?: 'primary' | 'secondary'
}

export default function Button({ text, to, style, type } : ButtonPropsInterface) {
    const history = useHistory()
    const [touched, setTouched] = useState(false)

    const onPressHandler = () => {
        history.push(to)
    }

    const onPressInHandler = () => {
        setTouched(true)
    }

    const onPressOutHandler = () => {
        setTouched(false)
    }

    return (
        <Pressable
            style={[
                styles.button,
                style,
                !type || type === "secondary"
                    ? styles.secondaryButton
                    : styles.privaryButton,
                touched ? styles.touch : null
            ]}
            onPress={onPressHandler}
            onPressIn={onPressInHandler}
            onPressOut={onPressOutHandler}
        >
            <Text
                style={[
                    styles.text,
                    !type || type === "secondary"
                        ? styles.secondaryText
                        : styles.primaryText
                ]}
            >
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: 'rgb(22, 150, 226)',
        shadowOffset: {
            width: 2,
            height: 0
        },
        shadowOpacity: 0.19,
    },
    text: {
        fontSize: 17,
        lineHeight: 18,
        fontFamily: 'OS-SB'
    },
    privaryButton: {
        backgroundColor: '#1696E2',
    },
    secondaryButton: {
        backgroundColor: '#fff',
    },
    primaryText: {
        color: '#fff',
    },
    secondaryText: {
        color: '#1696E2',
    },
    touch: {
        opacity: 0.5
    }
})
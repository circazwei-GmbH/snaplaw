import React, {useState} from 'react';
import { useHistory } from "react-router-native";
import { Pressable, StyleSheet, Text } from 'react-native'
import Button from "./Button";

interface ButtonPropsInterface {
    text: string;
    to: string;
    style?: object,
    type?: 'primary' | 'secondary'
}

export default function ButtonLink({ text, to, style, type } : ButtonPropsInterface) {
    const history = useHistory()

    const onPressHandler = () => {
        history.push(to)
    }

    return (
        <Button text={text} style={style} type={type} onPress={onPressHandler} />
    )
}
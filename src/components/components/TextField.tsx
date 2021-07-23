import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text, TextInputProps} from "react-native";

interface OnChanfeFunction {
    (text: string): void
}

interface TextFieldPropsInterface extends TextInputProps {
    placeholder?: string,
    fixed?: boolean,
    validations?: Array<Function>,
    errorMessage?: string,
    value?: string,
    onChangeFunction: OnChanfeFunction
}

export default function TextField({ placeholder, fixed = false, errorMessage, onChangeFunction, value, ...props } : TextFieldPropsInterface) {
    const [localValue, setLocalValue] = useState(value);
    const [focused, setFocused] = useState(false);

    const textChangeHandler = (text: string) => {
        setLocalValue(text)
        if (typeof onChangeFunction === 'function') {
            onChangeFunction(text)
        }
    }

    return (
        <View>
            <Text style={[
                styles.label,
                focused || localValue ? null : fixed ? styles.labelWithEmptyInputFixed : styles.labelWithEmptyInputDance,
            ]}>{placeholder}<Text style={styles.redText}>*</Text></Text>
            <TextInput
                {...props}
                placeholder={!focused ? placeholder : ''}
                style={[
                    styles.emptyInput,
                    focused ? styles.fullInput : null,
                    focused ? null : styles.focuslessInput,
                    localValue ? styles.inputWithText : null,
                    errorMessage ? styles.errorBorder : null
                ]}
                value={localValue}
                onChangeText={textChangeHandler}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <Text style={[styles.errorText, errorMessage ? null : styles.displayNone]}>{errorMessage}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyInput: {
        backgroundColor: '#EFF7FD',
        borderRadius: 10,
        height: 44,
        fontSize: 15,
        paddingHorizontal: 16,
        fontFamily: 'P'
    },
    fullInput: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#BBD1DE',
        fontSize: 17
    },
    inputWithText: {
        fontSize: 17
    },
    focuslessInput: {
        backgroundColor: '#EFF7FD',
        borderWidth: 1,
        borderColor: 'transparent'
    },
    label: {
        color: '#1696E2',
        fontSize: 14,
        marginBottom: 7
    },
    labelWithEmptyInputFixed: {
        opacity: 0
    },
    labelWithEmptyInputDance: {
        display: "none"
    },
    redText: {
        color: "#FA7171"
    },
    errorText: {
        paddingTop: 5,
        color: '#FA7171',
    },
    displayNone: {
        display: "none",
        marginBottom: 8
    },
    errorBorder: {
        borderColor: '#FA7171'
    },
})
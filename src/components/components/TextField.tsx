import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text} from "react-native";

interface TextFieldPropsInterface {
    placeholder?: string,
    fixed?: boolean,
}

export default function TextField({ placeholder, fixed = false } : TextFieldPropsInterface) {
    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);

    const textChangeHandler = (text: string) => {
        setValue(text)
    }

    return (
        <View>
            <Text style={[
                styles.label,
                focused || value ? null : fixed ? styles.labelWithEmptyInputFixed : styles.labelWithEmptyInputDance,
            ]}>{placeholder}<Text style={styles.redText}>*</Text></Text>
            <TextInput
                placeholder={!focused ? placeholder : ''}
                style={[
                    styles.emptyInput,
                    focused ? styles.fullInput : null,
                    focused ? null : styles.focuslessInput,
                    value ? styles.inputWithText : null
                ]}
                value={value}
                onChangeText={textChangeHandler}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
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
})
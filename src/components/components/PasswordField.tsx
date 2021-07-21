import React, {useState} from 'react';
import { TextInput, View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

interface OnChanfeFunction {
    (text: string): void
}

interface TextFieldPropsInterface {
    placeholder?: string,
    fixed?: boolean,
    validations?: Array<Function>,
    errorMessage?: string,
    value: string,
    onChange: OnChanfeFunction
    icon?: "visibility-off" | undefined,
}

export default function PasswordField({ placeholder, fixed = false, errorMessage, onChange, value, icon = undefined } : TextFieldPropsInterface) {
    const [localValue, setLocalValue] = useState(value);
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(false)

    const textChangeHandler = (text: string) => {
        if (typeof onChange === 'function') {
            onChange(text)
        }
        setLocalValue(text)
    }

    const iconPressHandler = () => {
        setVisible(!visible)
    }

    return (
        <>
            <View style={icon ? styles.container: null}>
                <Text style={[
                    styles.label,
                    focused || localValue ? null : fixed ? styles.labelWithEmptyInputFixed : styles.labelWithEmptyInputDance,
                    icon ? styles.inputWithIcon : null,
                ]}>{placeholder}<Text style={styles.redText}>*</Text></Text>
                <TextInput
                    placeholder={!focused ? placeholder : ''}
                    textContentType="password"
                    style={[
                        styles.emptyInput,
                        focused ? styles.fullInput : null,
                        focused ? null : styles.focuslessInput,
                        localValue ? styles.inputWithText : null,
                        errorMessage ? styles.errorBorder : null
                    ]}
                    secureTextEntry={!visible}
                    value={localValue}
                    onChangeText={textChangeHandler}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                {icon ? (
                    <View>
                        <MaterialIcons testID="PasswordField.Icon" onPress={iconPressHandler} color="#668395" style={styles.icon} size={20} name={icon} />
                        </View>
                ) : null}
            </View>
            <Text style={[styles.errorText, errorMessage ? null : styles.displayNone]}>{errorMessage}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    emptyInput: {
        backgroundColor: '#EFF7FD',
        borderRadius: 10,
        height: 44,
        paddingHorizontal: 16,
        fontSize: 15
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
    inputWithIcon: {
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
    icon: {
        position: "absolute",
        right: 21,
        bottom: 12,
        fontSize: 20
    },
    container : {
        position: "relative"
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
    }
})
import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text, NativeSyntheticEvent, TextInputKeyPressEventData} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

interface TextFieldPropsInterface {
    placeholder?: string,
    fixed?: boolean,
    icon?: string | null,
    onChange?: Function | undefined
}

export default function TextField({ placeholder, fixed = false, icon = null, onChange = undefined } : TextFieldPropsInterface) {
    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(false)

    const hideText = (text: string) => {
        return text.split('').map(() => '*').join('')
    }

    const textChangeHandler = ({ nativeEvent }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (nativeEvent.key === 'Backspace') {
            setValue(value.substr(0, -1))
        } else {
            setValue(value + nativeEvent.key)
        }
    }

    const iconPressHandler = () => {
        setVisible(!visible)
    }

    return (
        <View style={icon ? styles.container: null}>
            <Text style={[
                styles.label,
                focused || value ? null : fixed ? styles.labelWithEmptyInputFixed : styles.labelWithEmptyInputDance,
                icon ? styles.inputWithIcon : null
            ]}>{placeholder}<Text style={styles.redText}>*</Text></Text>
            <TextInput
                placeholder={!focused ? placeholder : ''}
                style={[
                    styles.emptyInput,
                    focused ? styles.fullInput : null,
                    focused ? null : styles.focuslessInput
                ]}
                value={visible ? value : hideText(value)}
                onKeyPress={textChangeHandler}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {icon ? (
                <MaterialIcons onPress={iconPressHandler} color="#668395" style={styles.icon} size="20" name={icon} />
            ) : null}
        </View>
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
    focuslessInput: {
        backgroundColor: '#EFF7FD'
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
    }
})
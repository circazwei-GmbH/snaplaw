import React from 'react';
import {StyleSheet, Switch, Text, View} from "react-native";

type DefaultSwitchProps = {
    title: string,
    value: boolean,
    onChange: (isEnabled: boolean) => void
}

export default function DefaultSwitch({ title, onChange, value } : DefaultSwitchProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
            <Switch
                testID={`Switch.${title}`}
                trackColor={{
                    false: '#E2E8ED',
                    true: '#1696E2'
                }}
                thumbColor={value ? '#1696E2' : '#fff'}
                onValueChange={onChange}
                value={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 45,
        paddingHorizontal: 16,
        marginTop: 10,
        backgroundColor: '#F8FCFF',
        elevation: 1,
        shadowColor: 'rgba(196, 211, 220, 0.6)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    buttonText: {
        fontSize: 17,
        color: '#202020'
    }
})
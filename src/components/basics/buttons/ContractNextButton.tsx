import React from 'react'
import {NativeSyntheticEvent, Pressable, Text, StyleSheet} from "react-native";
import {useI18n} from "../../../translator/i18n";
import { Feather } from '@expo/vector-icons';

type ContractNextButtonProps = {
    onPress: (ev: NativeSyntheticEvent<unknown>) => void
}

export default function ContractNextButton({ onPress }: ContractNextButtonProps) {
    const { t } = useI18n()
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}> {t('contracts.buttons.next')} </Text>
            <Feather name="arrow-right" size={24} color="#1696E2" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
    },
    text: {
        fontFamily: 'OS-B',
        fontSize: 17,
        color: '#1696E2'
    }
})
import React from 'react'
import {NativeSyntheticEvent, Pressable, StyleSheet, Text} from "react-native";
import {Feather} from "@expo/vector-icons";
import {useI18n} from "../../../translator/i18n";

type ContractBackButtonProps = {
    onPress: (ev: NativeSyntheticEvent<unknown>) => void
}

export default function ContractBackButton({ onPress }: ContractBackButtonProps) {
    const { t } = useI18n()
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Feather name="arrow-left" size={24} color="#202020" />
            <Text style={styles.text}>{t('contracts.buttons.back')}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row"
    },
    text: {
        fontFamily: 'OS',
        fontSize: 17,
        color: '#202020'
    }
})
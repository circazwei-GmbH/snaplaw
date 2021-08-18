import React from "react";
import {Text, StyleSheet} from "react-native";

type ContractFormTitleProps = {
    title: string
}

export default function ContractFormTitle({ title }: ContractFormTitleProps) {
    return (
        <Text style={styles.title}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'OS-B',
        fontSize: 17,
        color: '#202020',
        textTransform: 'uppercase'
    }
})
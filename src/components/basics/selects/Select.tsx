import React from 'react'
import {Picker, PickerItem} from 'react-native-woodpicker'
import {StyleSheet, ViewStyle} from "react-native";

type SelectProps = {
    items: Array<{label: string, value: string}>,
    selectedValue: PickerItem | undefined,
    onValueChange: (itemValue: PickerItem, itemIndex: number) => void,
    style?: ViewStyle | undefined
}

export default function Select({ onValueChange, selectedValue, items, style }: SelectProps) {
    return (
        <Picker style={{...style, ...styles.select}} onItemChange={onValueChange} item={selectedValue} items={items} />
    )
}

const styles = StyleSheet.create({
    select: {
        backgroundColor: '#EFF7FD',
        height: 44,
        borderRadius: 10,
        paddingHorizontal: 16,
        color: '#202020'
    }
})
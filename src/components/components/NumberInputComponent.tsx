import React, {useState} from 'react'
import {View, StyleSheet} from "react-native";
import NumberInput from '../basics/NumberInput'

type NumberInputComponentProps = {
    onChange: Function
}

export default function NumberInputComponent({ onChange }: NumberInputComponentProps) {
    const [numbers, setNumbers] = useState([])

    const changeNumberHandler = (number, position: number) => {
        numbers[position] = number
        setNumbers(numbers)
        onChange(numbers.join(''))
    }

    return (
        <View style={styles.container}>
            <NumberInput style={[styles.margin, styles.resetMarginLeft]} onChange={(number) => changeNumberHandler(number, 0)} />
            <NumberInput style={[styles.margin]} onChange={(number) => changeNumberHandler(number, 1)} />
            <NumberInput style={[styles.margin]} onChange={(number) => changeNumberHandler(number, 2)} />
            <NumberInput style={[styles.margin, styles.resetMarginRight]} onChange={(number) => changeNumberHandler(number, 3)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    margin: {
        marginHorizontal: 4
    },
    resetMarginLeft: {
        marginLeft: 0
    },
    resetMarginRight: {
        marginRight: 0
    }
})
import React, {useState} from 'react'
import {View, StyleSheet, Text} from "react-native";
import NumberInput from '../basics/NumberInput'

type NumberInputComponentProps = {
    onChange: Function,
    errorMessage: string
}

export default function NumberInputComponent({ onChange, errorMessage }: NumberInputComponentProps) {
    const [numbers, setNumbers] = useState([])

    const changeNumberHandler = (number, position: number) => {
        numbers[position] = number
        setNumbers(numbers)
        onChange(numbers.join(''))
    }

    return (
        <>
            <View style={styles.container}>
                <NumberInput style={[styles.margin, styles.resetMarginLeft]} onChange={(number) => changeNumberHandler(number, 0)} />
                <NumberInput style={[styles.margin]} onChange={(number) => changeNumberHandler(number, 1)} />
                <NumberInput style={[styles.margin]} onChange={(number) => changeNumberHandler(number, 2)} />
                <NumberInput style={[styles.margin, styles.resetMarginRight]} onChange={(number) => changeNumberHandler(number, 3)} />
            </View>
            {errorMessage ? (
                <View>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>)
                : null}
        </>
    )
};

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
    },
    errorMessage: {
        color: '#FA7171',
        textAlign: "center",
        paddingTop: 10,
        fontFamily: 'OS'
    }
})
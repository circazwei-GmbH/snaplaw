import React, {createRef, useState} from 'react'
import {View, StyleSheet, Text} from "react-native";
import NumberInput from '../basics/inputs/NumberInput'

type NumberInputComponentProps = {
    onChange: Function,
    errorMessage: string
}

const VERIFICATION_DIGITS_COUNT = 4;

export default function NumberInputComponent({ onChange, errorMessage }: NumberInputComponentProps) {
    const [numbers, setNumbers] = useState([])

    const refsBuilder = (countElements: number) => {
        const refs = [];

        for(let i = 0; i < countElements; i++) {
            refs.push(createRef())
        }
        return refs;
    }

    const refs = refsBuilder(VERIFICATION_DIGITS_COUNT);

    const changeNumberHandler = (number, position: number) => {
        numbers[position] = number
        setNumbers(numbers)
        onChange(numbers.join(''))
        if (number) {
            if (position !== refs.length - 1) {
                refs[position+1].current.focus()
            }
        } else {
            if (position !== 0) {
                refs[position-1].current.focus()
            }
        }
    }

    return (
        <>
            <View style={styles.container}>
                {refs.map((ref, index) => (
                    <NumberInput
                        key={index}
                        ref={ref}
                        style={[
                            styles.margin,
                            index === 0 ? styles.resetMarginLeft : null,
                            index === refs.length - 1 ?styles.resetMarginRight : null
                        ]}
                        onChange={(number) => changeNumberHandler(number, index)}
                    />
                ))}
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
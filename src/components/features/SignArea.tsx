import React from 'react'
import {StyleSheet, View} from "react-native";
import { Signature } from '@scale-at/expo-pixi'
import TextButton from "../basics/buttons/TextButton";


export default function SignArea() {
    let localRef: Signature | null = null;
    return (
        <View style={styles.container}>
            <Signature onChange={() => {}} ref={ref => (localRef = ref)} style={styles.pixi} />
            <TextButton text={'Clear'} onPress={() => localRef?.clear()} type="left" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#BBD1DE',
        borderRadius: 10,
        backgroundColor: '#fff',
        height: '80%'
    },
    pixi: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#BBD1DE',
    }
})
import React from 'react';
import {GestureResponderEvent, Image, Pressable, StyleProp, StyleSheet, TextStyle, View} from "react-native";
import { Feather } from '@expo/vector-icons';
import VerticalDivider from "../dividers/VerticalDivieder";

type SignInputProps = {
    style?: StyleProp<TextStyle>,
    signUri: string | undefined,
    signHandler: (event: GestureResponderEvent) => void
}

export default function SignInput({style, signUri, signHandler}: SignInputProps) {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.signContainer}>
                <Image style={styles.image} source={{uri: signUri}} testID="SignImageID" />
            </View>
            <View style={styles.rightPart}>
                <View style={styles.dividerContainer}>
                    <VerticalDivider />
                </View>
                <Pressable onPress={signHandler}>
                    <View style={styles.iconContainer} testID="SignInputPressID">
                        <Feather name="edit-3" size={22} color="#668395" />
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: '#EFF7FD',
        height: 70,
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    rightPart: {
        flexDirection: "row",
        alignItems: 'center'
    },
    iconContainer: {
        paddingHorizontal: 29
    },
    dividerContainer: {
        paddingVertical: 7
    },
    signContainer: {
        width: '70%',
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: '100%',
        height: '100%',
    }
})
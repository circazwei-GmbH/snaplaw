import React from 'react'
import {GestureResponderEvent, Pressable, StyleProp, StyleSheet, TextStyle, View} from "react-native";
import VerticalDivider from "../dividers/VerticalDivieder";
import DefaultText from "../typography/DefaultText";
import { Feather } from '@expo/vector-icons';

type InviteInputProps = {
    style?: StyleProp<TextStyle>,
    invitedName: string,
    inviteHandler: (event: GestureResponderEvent) => void
}

export default function InviteInput({style, invitedName, inviteHandler}: InviteInputProps) {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.signContainer}>
                <DefaultText text={invitedName} />
            </View>
            <View style={styles.rightPart}>
                <View style={styles.dividerContainer}>
                    <VerticalDivider />
                </View>
                <Pressable onPress={inviteHandler}>
                    <View style={styles.iconContainer} testID="InvitePressabelAreaID">
                        <Feather name="user-plus" size={22} color="#668395" />
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
        height: 44,
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
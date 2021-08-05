import React, { ReactElement } from 'react'
import { View, StyleSheet, Text, Pressable } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import * as RootNavigation from '../../router/RootNavigation'

type HeaderNavigationPoprs = {
    children: ReactElement,
    pageName: string
}

export default function HeaderNavigation({ children, pageName }: HeaderNavigationPoprs) {
    const backHandler = () => {
        RootNavigation.pop()
    }
    return (
        <>
            <View style={styles.header}>
                <Pressable testID="HeaderNavigation.back" onPress={backHandler}>
                    <MaterialIcons name="arrow-back-ios" size={16} />
                </Pressable>
                <Text style={styles.headerText}>
                    {pageName}
                </Text>
                <View style={styles.counterweight} />
            </View>
            {children}
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 47,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 25,
        justifyContent: "space-between"
    },
    headerText: {
        textAlign: "center",
        fontFamily: 'OS-SB',
        fontSize: 17
    },
    counterweight: {
        width: 14
    }
})
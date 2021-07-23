import React from 'react';
import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native'
import Button from "../../basics/buttons/Button";
import SocialButton from "../../basics/buttons/SocialButton";
import {FontAwesome5} from "@expo/vector-icons";
import {t} from 'i18n-js'
type ActionsBlockProps = {
    submitHandler: (event: GestureResponderEvent) => void,
    buttonTextKey: string,
    underButtonTextKey: string
}

export default function ActionBlock({submitHandler, buttonTextKey, underButtonTextKey} : ActionsBlockProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.width100]}>
                <Button text={t(buttonTextKey)} type="primary" onPress={submitHandler} />
            </View>
            <View style={[styles.signInWithContainer]}>
                <View style={styles.signInWith}>
                    <Text style={styles.signInWithLine} />
                    <View style={styles.signInWithTextWrap}>
                        <Text style={styles.signInWithText}>{t(underButtonTextKey)}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.socialButtons}>
                <SocialButton>
                    <FontAwesome5 name="google" size={24} />
                </SocialButton>
                <SocialButton>
                    <FontAwesome5 name="facebook-f" size={24} />
                </SocialButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 21,
        marginTop: 30
    },
    width100: {
        width: '100%'
    },
    signInWithContainer: {
        height: 20,
        marginTop: 20,
        position: "relative"
    },
    signInWith: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
    },
    signInWithLine: {
        backgroundColor: '#DDDDDD',
        width: '95%',
        height: 1,
    },
    signInWithTextWrap: {
        fontSize: 13,
        fontFamily: 'P',
        position: "absolute",
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    signInWithText: {
        backgroundColor: '#fff',
        paddingHorizontal: 16
    },
    socialButtons: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
})
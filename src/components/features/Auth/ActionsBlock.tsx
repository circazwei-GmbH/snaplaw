import React from 'react';
import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native'
import Button from "../../basics/buttons/Button";
import SocialButton from "../../basics/buttons/SocialButton";
import {FontAwesome5} from "@expo/vector-icons";

type ActionsBlockProps = {
    submitHandler: (event: GestureResponderEvent) => void,
    buttonText: string
}

export default function ActionBlock({submitHandler, buttonText} : ActionsBlockProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.width100]}>
                <Button text={buttonText} type="primary" onPress={submitHandler} />
            </View>
            <View style={[styles.signInWithContainer]}>
                <View style={styles.signInWith}>
                    <Text style={styles.signInWithLine} />
                    <Text style={styles.signInWithText}>Or Sign in with</Text>
                    <Text style={styles.signInWithLine} />
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
    },
    signInWith: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
    },
    signInWithLine: {
        backgroundColor: '#DDDDDD',
        width: '30%',
        height: 1,
    },
    signInWithText: {
        fontSize: 13,
        fontFamily: 'P'
    },
    socialButtons: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
})
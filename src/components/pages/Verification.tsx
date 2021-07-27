import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableWithoutFeedback, Keyboard} from "react-native";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Button from "../basics/buttons/Button";
import { setModal } from '../../store/modules/main/slice'
import { verificationFailed } from '../../store/modules/auth/slice'
import HeaderNavigation from '../layouts/HeaderNavigation'
import {t} from 'i18n-js'
import NumberInputComponent from "../components/NumberInputComponent";
import MessageAndLink from "../features/MessageAndLink";
import {requestVerification, requestVerificationResend} from "../../store/modules/auth/action-creators";

type VerificationProps = {
    email: string
}

export default function Verification({ route: {params: {email}} }:VerificationProps) {
    const dispatch = useAppDispatch()
    const [number, setNumber] = useState('')
    const errorMessage = useAppSelector(state => state.auth.verification.error)

    const resendHandler = () => {
        dispatch(setModal({
            message: 'Test',
            actions: [
                {
                    name: 'No',
                    colortype: 'error'
                },
                {
                    action: requestVerificationResend(email),
                    name: 'Yes',
                    colortype: 'primary'
                }
            ]
        }))
    }

    const submitHandler = () => {
        dispatch(verificationFailed(''))
        dispatch(requestVerification(number, email))
    }

    useEffect(() => {
        return () => {
            dispatch(verificationFailed(''))
        }
    }, [])

    return (
        <HeaderNavigation pageName={t('verification.title')}>
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Image style={styles.image} accessibilityLabel="welcome-image" source={require('../../../assets/verification.png')} />
                        <Text style={styles.description}>{t('verification.description', {email})}</Text>
                    </View>
                    <View style={styles.inputArea}>
                        <NumberInputComponent onChange={setNumber} errorMessage={errorMessage} />
                        <View style={styles.resendArea}>
                            <MessageAndLink linkHandler={resendHandler} linkText={t('verification.resend.link')} messageTextKey="verification.resend.text" />
                        </View>
                    </View>
                    <View style={styles.actionArea}>
                        <Button text={t('verification.submit')} type="primary" onPress={submitHandler} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </HeaderNavigation>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 30
    },
    container: {
        marginTop: 20,
        paddingHorizontal: 16,
        justifyContent: "space-between",
        flexDirection: "column",
        flex: 1
    },
    topContainer: {
        justifyContent:"center",
        flexDirection: "column",
        alignItems: "center"
    },
    image: {
        justifyContent: "center"
    },
    description: {
        textAlign: "center",
        fontFamily: 'P',
        marginTop: 13,
        fontSize: 17
    },
    inputArea: {
        marginTop: 40
    },
    resendArea: {
        marginTop: 20
    },
    actionArea: {
        marginTop: 60,
        marginBottom: 40,
        marginHorizontal: 17
    }
})

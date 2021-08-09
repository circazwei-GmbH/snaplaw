import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Keyboard} from "react-native";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Button from "../basics/buttons/Button";
import { verificationFailed } from '../../store/modules/auth/slice'
import HeaderNavigation from '../layouts/HeaderNavigation'
import NumberInputComponent from "../components/NumberInputComponent";
import MessageAndLink from "../features/MessageAndLink";
import {requestVerification, requestVerificationResend} from "../../store/modules/auth/action-creators";
import ImageAndText from "../features/Auth/ImageAndText";
import {useI18n} from "../../translator/i18n";

type VerificationProps = {
    route: {
        params: {
            email: string,
            to: string
        }
    }
}

export default function Verification({ route: {params: {email, to}} }:VerificationProps) {
    const {t} = useI18n()
    const dispatch = useAppDispatch()
    const [number, setNumber] = useState('')
    const errorMessage = useAppSelector(state => state.auth.verification.error)

    const resendHandler = () => {
        dispatch(requestVerificationResend(email))
    }

    const submitHandler = () => {
        dispatch(verificationFailed(''))
        dispatch(requestVerification(number, email, to))
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
                    <ImageAndText image={require('../../../assets/verification.png')} text={t('verification.description', {email})} />
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

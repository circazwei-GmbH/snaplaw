import React from 'react';
import {Text, View, StyleSheet, Image} from "react-native";
import {useAppDispatch} from "../../store/hooks";
import Button from "../basics/buttons/Button";
import { setModalMessage } from '../../store/modules/main/slice'
import HeaderNavigation from '../layouts/HeaderNavigation'
import {t} from 'i18n-js'
import NumberInputComponent from "../components/NumberInputComponent";
import DontHaveAnyAccount from "../features/Auth/DontHaveAnyAccount";

type VerificationProps = {
    email: string
}

export default function Verification({ route: {params: {email}} }:VerificationProps) {
    const dispatch = useAppDispatch()
    const resendHandler = () => {
        dispatch(setModalMessage('We have just sent a verification code to your email'))
    }

    const submitHandler = () => {

    }

    return (
        <HeaderNavigation pageName={t('verification.title')}>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.image} accessibilityLabel="welcome-image" source={require('../../../assets/verification.png')} />
                    <Text style={styles.description}>{t('verification.description', {email})}</Text>
                </View>
                <View style={styles.inputArea}>
                    <NumberInputComponent />
                    <View style={styles.resendArea}>
                        <DontHaveAnyAccount linkHandler={resendHandler} linkText={t('verification.resend.link')} messageTextKey="verification.resend.text" />
                    </View>
                </View>
                <View style={styles.actionArea}>
                    <Button text={t('verification.submit')} type="primary" onPress={submitHandler} />
                </View>
            </View>
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

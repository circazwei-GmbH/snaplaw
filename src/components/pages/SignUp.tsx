import React, {useState} from 'react';
import {View, StyleSheet} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList, ROUTE} from "../../router/RouterTypes";
import AuthLayout from "../layouts/AuthLayout";
import MainHeadline from "../basics/typography/MainHeadline";
import SignUpForm, { SignUpFormInterface } from '../features/forms/SignUpForm'
import DontHaveAnyAccount from "../features/Auth/DontHaveAnyAccount";
import {formFieldFill, validate} from "../../utils/forms";
import {email, length} from "../../validations/default";
import ActionBlock from "../features/Auth/ActionsBlock";
import { t } from 'i18n-js'

type SignUpProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignUp'>
}

export default function SignUp({ navigation } : SignUpProps) {
    let form: SignUpFormInterface = {
        name: {
            value: '',
            error: '',
            displayError: false,
            validators: [length('Field required', 1)]
        },
        email: {
            value: '',
            error: '',
            displayError: false,
            validators: [email('Should be an email pattern')]
        },
        password: {
            value: '',
            error: '',
            displayError: false,
            validators: [length('Should be at least 6 chars', 6)]
        }
    };
    let setForm: (form: SignUpFormInterface) => void;
    [form, setForm] = useState(form)

    const fieldChangeHandler = (fieldName: 'name' | 'email' | 'password', text: string) => {
        setForm(formFieldFill(fieldName, text, form))
    }

    const submitHandler = () => {
        const localForm = {
            name: validate(form.name),
            email: validate(form.email),
            password: validate(form.password)
        }
        setForm(localForm)

        if (localForm.email.error || localForm.name.error || localForm.password.error) {
            return
        }

        console.log(localForm.email.value, localForm.name.value, localForm.password.value)
    }

    const linkHandler = () => {
        navigation.replace(ROUTE.SIGNIN)
    }

    return (
        <View style={styles.mainContainer}>
            <AuthLayout>
                <View style={styles.container}>
                    <View style={styles.width100}>
                        <View style={styles.headline}>
                            <MainHeadline text={t('sign_up.headline')} />
                        </View>
                        <View style={styles.width100}>
                            <SignUpForm navigation={navigation} form={form} fieldChangeHandler={fieldChangeHandler} />
                        </View>
                        <ActionBlock submitHandler={submitHandler} buttonTextKey="sign_up.submit" underButtonTextKey="sign_up.alternative" />
                    </View>
                    <View style={[styles.width100, styles.actions]}>
                        <DontHaveAnyAccount
                            linkHandler={linkHandler}
                            linkText={t('sign_up.log_in')}
                            messageTextKey="sign_up.to_login"
                        />
                    </View>
                </View>
            </AuthLayout>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: "column",
        alignSelf: 'stretch',
    },
    width100: {
        width: '100%'
    },
    headline: {
        marginBottom: 10,
    },
    actions: {
        marginBottom: 30
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
    dontHaveAccountContainer: {
        marginTop: 51,
    },
    dontHaveAccount: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'P',
    },
    signUpLink: {
        fontSize: 16,
        textAlign: 'center'
    },
    actionButton: {
        marginTop: 30,
    }
})
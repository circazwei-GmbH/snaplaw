import React, {useState} from 'react';
import { View, StyleSheet, Text } from "react-native";
import MainHeadline from "../basics/typography/MainHeadline";
import AuthLayout from "../layouts/AuthLayout";
import SignInForm, { SignInFormInterface } from "../features/forms/SignInForm";
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList, ROUTE} from '../../router/RouterTypes'
import { email, length } from '../../validations/default';
import DontHaveAnyAccount from "../features/Auth/DontHaveAnyAccount";
import {formFieldFill, validate} from "../../utils/forms";
import Button from "../basics/buttons/Button";
import SocialButton from "../basics/buttons/SocialButton";
import {FontAwesome5} from "@expo/vector-icons";
import ActionBlock from "../features/Auth/ActionsBlock";

type SignInProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignIn'>
}

export default function SignIn({ navigation } : SignInProps) {
    let form: SignInFormInterface = {
        email: {
            value: '',
            error: '',
            displayError: false,
            validators: [email('Sould be email')]
        },
        password: {
            value: '',
            error: '',
            displayError: false,
            validators: [length('too short', 6)]
        }
    };
    let setForm: (form: SignInFormInterface) => void;
    [form, setForm] = useState(form);

    const fieldChangeHandler = (fieldName: "email" | "password", text: string) => {

        setForm(formFieldFill(fieldName, text, form))
    }

    const submitHandler = () => {
        const localForm = {
            email: validate(form.email),
            password: validate(form.password)
        }
        setForm(localForm)

        if (localForm.email.error || localForm.password.error) {
            return;
        }

        // TODO dispatch
        console.log(localForm.email.value, localForm.password.value)
    }

    return (
        <View style={styles.mainContainer}>
            <AuthLayout>
                <View style={styles.container}>
                    <View style={styles.width100}>
                        <View style={styles.headline}>
                            <MainHeadline text="Sign In" />
                        </View>
                        <View style={styles.width100}>
                            <SignInForm navigation={navigation} form={form} fieldChangeHandler={fieldChangeHandler} />
                        </View>
                       <ActionBlock submitHandler={submitHandler} buttonText="Sign In" />
                    </View>
                    <View style={[styles.width100, styles.actions]}>
                       <DontHaveAnyAccount
                           linkHandler={() => navigation.replace(ROUTE.SIGNUP)}
                           linkText="Sign up"
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
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: "column",
        alignSelf: 'stretch'
    },
    headline: {
        marginBottom: 10,
    },
    width100: {
        width: '100%'
    },
    actions: {
        paddingHorizontal: 21,
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
        marginTop: 30
    }
})
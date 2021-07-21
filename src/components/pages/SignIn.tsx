import React, {useState} from 'react';
import { View, StyleSheet, Text } from "react-native";
import MainHeadline from "../basics/typography/MainHeadline";
import AuthLayout from "../layouts/AuthLayout";
import SignInForm, { FieldInterface } from "../features/forms/SignInForm";
import Button from "../basics/buttons/Button";
import SocialButton from "../basics/buttons/SocialButton";
import {FontAwesome5} from "@expo/vector-icons";
import Link from "../basics/links/link";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../router/Router'
import { email, length } from '../../validations/default';

type SignInProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignIn'>
}

export default function SignIn({ navigation } : SignInProps) {
    const [form, setForm] = useState({
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
    });

    const validate = (stateField: FieldInterface) => {
        const localField = stateField;

        for(let i = 0; i < localField.validators.length; i++) {
            const validator = localField.validators[i];
            const result = validator(localField.value)
            if (result) {
                localField.error = result;
                localField.displayError = true;
            } else {
                localField.error = '';
                localField.displayError = false;
            }
        }

        return localField
    }

    const fieldChangeHandler = (fieldName: string, text: string) => {
        const preparedForm = {
            ...form,
            [fieldName]: {
                ...form[fieldName],
                value: text,
            }
        };
        if (preparedForm[fieldName].error) {
            preparedForm[fieldName] = validate(preparedForm[fieldName])
        }

        setForm(preparedForm)
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
        <View style={styles.mainContainer}
        >
            <AuthLayout>
                <View style={styles.container}>
                    <View style={styles.width100}>
                        <View style={styles.headline}>
                            <MainHeadline text="Sign In" />
                        </View>
                        <View style={styles.width100}>
                            <SignInForm navigation={navigation} form={form} fieldChangeHandler={fieldChangeHandler} />
                        </View>
                    </View>
                    <View style={[styles.width100, styles.actions]}>
                        <View style={styles.width100}>
                            <Button text="Sign In" type="primary" onPress={submitHandler} />
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
                        <View style={styles.dontHaveAccountContainer}>
                            <Text style={styles.dontHaveAccount}>
                                Don't have any account?
                            </Text>
                            <Link style={styles.signUpLink} text="Sign up" onPress={() => navigation.replace('SignUp')} />
                        </View>
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
        flexDirection: 'column'
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
    }
})
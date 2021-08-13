import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, View, StyleSheet} from "react-native";
import HeaderNavigation from "../layouts/HeaderNavigation";
import ImageAndText from "../features/Auth/ImageAndText";
import PasswordField from "../components/PasswordField";
import Button from "../basics/buttons/Button";
import {FieldInterface} from "../features/forms/SignInForm";
import {length, match} from "../../validations/default";
import {formFieldFill, validate} from "../../utils/forms";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {requestChangePassword} from "../../store/modules/auth/action-creators";
import {changePasswordFailed} from "../../store/modules/auth/slice";
import {useI18n} from "../../translator/i18n";

type ChangePasswordProps = {
    route: {
        params: {
            email: string,
            token: string,
            refresh: string
        }
    }
}

export type ChangePasswordForm = {
    password: FieldInterface,
    confirm_password: FieldInterface
}

export default function ChangePassword({route: {params: {token, refresh}}} : ChangePasswordProps) {
    const {t} = useI18n()
    let form: ChangePasswordForm = {
        password: {
            value: '',
            error: '',
            displayError: false,
            validators: [length(t('change_password.errors.password_length'), 6)]
        },
        confirm_password: {
            value: '',
            error: '',
            displayError: false,
            validators: [
                length(t('change_password.errors.password_length'), 6),
                match(t('change_password.errors.confirm_password'), 'password')
            ]
        }
    }
    const dispatch = useAppDispatch();
    let setForm: (form: ChangePasswordForm) => void;
    [form, setForm] = useState(form);
    const errorMessage = useAppSelector(state => state.auth.changePassword.error)

    useEffect(() => {
        setForm({
            ...form,
            password: {
                ...form.password,
                error: errorMessage
            }
        })
    }, [errorMessage])

    useEffect(() => () => {
        dispatch(changePasswordFailed(''))
    }, [])

    const fieldHandler = (text: string, fieldName: string) => {
        setForm(formFieldFill(fieldName, text, form))
    }

    const saveHandler = () => {
        let localForm = {
            password: validate(form.password),
            confirm_password: validate(form.confirm_password, form)
        }

        setForm(localForm)

        if (localForm.password.error || localForm.confirm_password.error) {
            return
        }

        dispatch(requestChangePassword(token, refresh, localForm.password.value))
    }

    return (
        <HeaderNavigation pageName={t('change_password.title')}>
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View>
                        <ImageAndText image={require('../../../assets/change_password.png')} text={t('change_password.description')} />
                        <View style={styles.emailField}>
                            <PasswordField
                                errorMessage={form.password.error}
                                fixed
                                placeholder={t('change_password.fields.new_password')}
                                value={form.password.value}
                                onChange={(text: string) => fieldHandler(text, 'password')}
                            />
                        </View>
                        <View style={styles.confirm_field}>
                            <PasswordField
                                errorMessage={form.confirm_password.error}
                                placeholder={t('change_password.fields.confirm_password')}
                                value={form.confirm_password.value}
                                onChange={(text: string) => fieldHandler(text, 'confirm_password')}
                            />
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <Button type="primary" text={t('change_password.save')} onPress={saveHandler} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </HeaderNavigation>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 16,
        justifyContent: "space-between",
        flexDirection: "column",
        flex: 1
    },
    emailField: {
        marginTop: 25
    },
    confirm_field: {
        marginTop: 16
    },
    actions: {
        marginBottom: 80
    }
})
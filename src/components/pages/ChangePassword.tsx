import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View, StyleSheet} from "react-native";
import HeaderNavigation from "../layouts/HeaderNavigation";
import ImageAndText from "../features/Auth/ImageAndText";
import { t } from 'i18n-js'
import PasswordField from "../components/PasswordField";
import Button from "../basics/buttons/Button";

type ChangePasswordProps = {
    route: {
        params: {
            email: string,
            token: string
        }
    }
}

export default function ChangePassword({route: {params: {}}} : ChangePasswordProps) {
    return (
        <HeaderNavigation pageName={t('change_password.title')}>
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View>
                        <ImageAndText image={require('../../../assets/change_password.png')} text={t('change_password.description')} />
                        <View style={styles.emailField}>
                            <PasswordField fixed placeholder={t('change_password.fields.new_password')} value={''} onChange={() => {}} />
                        </View>
                        <View style={styles.confirm_field}>
                            <PasswordField placeholder={t('change_password.fields.confirm_password')} value={''} onChange={() => {}} />
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <Button type="primary" text={t('change_password.save')} onPress={() => {}} />
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
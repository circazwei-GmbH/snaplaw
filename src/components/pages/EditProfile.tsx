import React from 'react';
import TopBar from '../layouts/TopBar'
import {useI18n} from "../../translator/i18n";
import {View, StyleSheet} from "react-native";
import UploadAvatar from "../features/UploadAvatar";

export default function EditProfile() {
    const { t } = useI18n()

    return (
        <TopBar pageName={t('edit_profile.title')}>
            <View style={styles.container}>
                <UploadAvatar />
            </View>
        </TopBar>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "row"
    }
})
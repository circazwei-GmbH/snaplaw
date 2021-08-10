import React from 'react';
import TopBar from '../layouts/TopBar'
import {useI18n} from "../../translator/i18n";
import {View, StyleSheet, Alert} from "react-native";
import UploadAvatar from "../features/UploadAvatar";
import TextButton from '../basics/buttons/TextButton'

export default function EditProfile() {
    const { t } = useI18n()

    return (
        <TopBar 
          pageName={t('edit_profile.title')}
          rightButton={
            <TextButton 
              text={t('edit_profile.buttons_text.edit')}
              onPress={() => Alert.alert('Hi')}
              type="right"
            />
          }
        >
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
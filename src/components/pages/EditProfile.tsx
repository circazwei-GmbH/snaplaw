import React, { useState } from "react";
import TopBar from "../layouts/TopBar";
import { useI18n } from "../../translator/i18n";
import { View, StyleSheet } from "react-native";
import UploadAvatar from "../features/UploadAvatar";
import TextButton from "../basics/buttons/TextButton";
import EditProfileForm from "../features/forms/EditProfileForm";
import { toggleBoolValue } from "../../utils/toggleBoolValue";

export default function EditProfile() {
  const { t } = useI18n();
  const [edit, setEdit] = useState(false);

  const editHandler = () => toggleBoolValue(edit, setEdit);

  return (
    <TopBar
      pageName={t("edit_profile.title")}
      leftButton={
        edit ? (
          <TextButton
            text={t("edit_profile.buttons_text.cancel")}
            onPress={editHandler}
            type="left"
          />
        ) : undefined
      }
      rightButton={
        edit ? (
          <TextButton
            text={t("edit_profile.buttons_text.save")}
            onPress={editHandler}
            type="right"
          />
        ) : (
          <TextButton
            text={t("edit_profile.buttons_text.edit")}
            onPress={editHandler}
            type="right"
          />
        )
      }
    >
      <View style={styles.container}>
        <View style={styles.uploadAvatarBox}>
          <UploadAvatar />
        </View>
        <EditProfileForm edit={edit} />
      </View>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  uploadAvatarBox: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 15,
  },
});

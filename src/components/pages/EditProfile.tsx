import React, { useState } from "react";
import TopBar from "../layouts/TopBar";
import { useI18n } from "../../translator/i18n";
import { View, StyleSheet } from "react-native";
import UploadAvatar from "../features/UploadAvatar";
import TextButton from "../basics/buttons/TextButton";
import EditProfileTextField from "../components/EditProfileTextField";
import { toggleBoolValue } from "../../utils/toggleBoolValue";

export default function EditProfile() {
  const { t } = useI18n();
  const [editable, setEditable] = useState(false);

  return (
    <TopBar
      pageName={t("edit_profile.title")}
      leftButton={
        editable ? (
          <TextButton
            text={t("edit_profile.buttons_text.cancel")}
            onPress={() => toggleBoolValue(editable, setEditable)}
            type="left"
          />
        ) : undefined
      }
      rightButton={
        editable ? (
          <TextButton
            text={t("edit_profile.buttons_text.save")}
            onPress={() => toggleBoolValue(editable, setEditable)}
            type="right"
          />
        ) : (
          <TextButton
            text={t("edit_profile.buttons_text.edit")}
            onPress={() => toggleBoolValue(editable, setEditable)}
            type="right"
          />
        )
      }
    >
      <View style={styles.container}>
        <View style={styles.uploadAvatarBox}>
          <UploadAvatar />
        </View>
        <View style={styles.inputBox}>
          <EditProfileTextField
            placeholder={"First name"}
            value={"Vladislav"}
            editable={editable}
          />
        </View>
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
  inputBox: {
    justifyContent: "flex-start",
    width: "100%",
  },
});

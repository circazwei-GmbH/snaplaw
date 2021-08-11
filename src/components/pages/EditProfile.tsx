import React from "react";
import TopBar from "../layouts/TopBar";
import { useI18n } from "../../translator/i18n";
import { View, StyleSheet } from "react-native";
import UploadAvatar from "../features/UploadAvatar";
import TextButton from "../basics/buttons/TextButton";
import EditProfileTextField from "../components/EditProfileTextField";

export default function EditProfile() {
  const { t } = useI18n();

  return (
    <TopBar
      pageName={t("edit_profile.title")}
      rightButton={
        <TextButton
          text={t("edit_profile.buttons_text.edit")}
          onPress={() => alert("Hi")}
          type="right"
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.uploadAvatarBox}>
          <UploadAvatar />
        </View>
        <View style={styles.inputBox}>
          <EditProfileTextField placeholder={"First name"} />
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

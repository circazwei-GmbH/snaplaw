import React from "react";
import { View, StyleSheet } from "react-native";
import { useI18n } from "../../../translator/i18n";
import TopBar from "../../layouts/TopBar";
import TextField from "../../components/TextField";
import DefaultText from "../../basics/typography/DefaultText";
import UserAvatar from "../../components/UserAvatar";

export default function Invite(): JSX.Element {
  const { t } = useI18n();

  return (
    <TopBar pageName={t("invite_page.title")}>
      <View style={styles.container}>
        <UserAvatar />
      </View>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

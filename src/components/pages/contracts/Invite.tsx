import React from "react";
import { View, StyleSheet } from "react-native";
import { useI18n } from "../../../translator/i18n";
import TopBar from "../../layouts/TopBar";
import DefaultText from "../../basics/typography/DefaultText";
import UserAvatar from "../../components/UserAvatar";
import { useAppSelector } from "../../../store/hooks";

export default function Invite(): JSX.Element {
  const { t } = useI18n();
  const url = useAppSelector((state) => state.profile.user?.avatar);

  return (
    <TopBar pageName={t("invite_page.title")}>
      <View style={styles.container}>
        <UserAvatar sizeSmall url={url} />
        <DefaultText text={t("invite_page.invitation")} style={styles.text} />
      </View>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    width: "75%",
    textAlign: "center",
  },
});

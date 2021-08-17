import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import TopBar from "../../layouts/TopBar";
import { useI18n } from "../../../translator/i18n";
import UserDataForm from "../../features/forms/UserDataForm";

export default function Notifications(): JSX.Element {
  const { t } = useI18n();

  return (
    <TopBar pageName={t("notifications.title")}>
      <UserDataForm />
    </TopBar>
  );
}

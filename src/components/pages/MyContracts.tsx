import React from "react";
import { Text, View, StyleSheet } from "react-native";
import TopBar from "../layouts/TopBar";
import NotificationBell from "../components/NotificationBell";
import { useI18n } from "../../translator/i18n";

export default function MyContracts() {
  const { t } = useI18n();

  return (
    <TopBar
      pageName={t("my_contracts.tab_name")}
      leftButton={<NotificationBell />}
    >
      <View>
        <Text style={styles.test}>My Contracts</Text>
      </View>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  test: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 30,
  },
});

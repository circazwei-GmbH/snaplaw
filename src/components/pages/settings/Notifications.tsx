import React from "react";
import { View, StyleSheet } from "react-native";
import TopBar from "../../layouts/TopBar";
import { useI18n } from "../../../translator/i18n";
import DefaultText from "../../basics/typography/DefaultText";

export default function Notifications(): JSX.Element {
  const { t } = useI18n();

  return (
    <TopBar pageName={t("notifications.title")}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <DefaultText
            text={t("notifications.title_second_black")}
            style={styles.title}
          />
          <DefaultText
            text={t("notifications.title_second_blue")}
            style={[styles.title, styles.titleBlue]}
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
  titleBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 80,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
  },
  titleBlue: {
    color: "lightblue",
  },
});

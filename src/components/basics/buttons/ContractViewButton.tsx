import React from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useI18n } from "../../../translator/i18n";

type ContractViewButton = {
  onPress: (ev: NativeSyntheticEvent<unknown>) => void;
};

export default function ContractViewButton({ onPress }: ContractViewButton) {
  const { t } = useI18n();
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{t("contracts.buttons.view")}</Text>
      <Feather name="arrow-right" size={24} color="#1696E2" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontFamily: "OS-B",
    fontSize: 17,
    color: "#1696E2",
  },
});

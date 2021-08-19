import React from "react";
import { Text, View, StyleSheet, GestureResponderEvent } from "react-native";
import Link from "../basics/links/link";
import { useI18n } from "../../translator/i18n";

type AuthActionsProps = {
  linkHandler: (event: GestureResponderEvent) => void;
  linkText: string;
  messageTextKey: string;
};

export default function MessageAndLink({
  linkHandler,
  linkText,
  messageTextKey,
}: AuthActionsProps) {
  const { t } = useI18n();
  return (
    <View>
      <Text style={styles.dontHaveAccount}>{t(messageTextKey)}</Text>
      <Link style={styles.signUpLink} text={linkText} onPress={linkHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  dontHaveAccount: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "P",
  },
  signUpLink: {
    fontSize: 16,
    textAlign: "center",
  },
});

import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useI18n } from "../../translator/i18n";

interface VerificationCounterPropsInterface {
  sizeSmall: boolean;
  doHaveUrl?: string;
}

export default function ProfileHeadline({
  sizeSmall,
  doHaveUrl,
}: VerificationCounterPropsInterface) {
  const [verifications] = useState<number>(0);
  const { t } = useI18n();
  return (
    <View style={!sizeSmall && doHaveUrl ? styles.horizontal : styles.vertical}>
      <Text style={styles.textGray}>{t("my_profile.verified_gray")}</Text>
      <Text style={styles.textBlack}>
        {`${verifications} ${t("my_profile.verified_black")}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  textBlack: {
    width: "50%",
    fontFamily: "OS-SB",
    fontSize: 16,
    fontWeight: "600",
    color: "#202020",
    textAlign: "right",
  },
  textGray: {
    width: "50%",
    fontSize: 16,
    fontWeight: "400",
    color: "#909090",
    textAlign: "left",
  },
});

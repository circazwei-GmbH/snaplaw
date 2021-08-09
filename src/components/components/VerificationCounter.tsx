<<<<<<< HEAD
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { t } from "i18n-js";
=======
import React, { useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import {useI18n} from "../../translator/i18n";
>>>>>>> e231a40fa121abc4978354ff4c91b65890c2dfbc

interface VerificationCounterPropsInterface {
  sizeSmall: boolean;
}

<<<<<<< HEAD
export default function ProfileHeadline({
  sizeSmall,
}: VerificationCounterPropsInterface) {
  const [verifications, setVerifications] = useState<number>(0);

=======
export default function ProfileHeadline({ size }: VerificationCounterPropsInterface) {
  const [verifications] = useState<number>(0)
  const {t} = useI18n()
>>>>>>> e231a40fa121abc4978354ff4c91b65890c2dfbc
  return (
    <View style={sizeSmall ? styles.vertical : styles.horizontal}>
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
  },
  textBlack: {
    width: "30%",
    fontFamily: "OS-SB",
    fontSize: 16,
    fontWeight: "600",
    color: "#202020",
    textAlign: "right",
  },
  textGray: {
    width: "60%",
    fontSize: 16,
    fontWeight: "400",
    color: "#909090",
    textAlign: "left",
  },
});

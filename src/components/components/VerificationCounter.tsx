import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useI18n } from "../../translator/i18n";
import { useAppSelector } from "../../store/hooks";
import { LANGUAGE_ENGLISH } from "../../store/modules/profile/constants";
import { MediaType } from "../../services/media";

interface VerificationCounterPropsInterface {
  sizeSmall?: boolean;
  doHaveUrl?: MediaType | null;
}

export default function VerificationCounter({
  sizeSmall,
  doHaveUrl,
}: VerificationCounterPropsInterface) {
  const [verifications] = useState<number>(0);
  const { t } = useI18n();
  const currentLanguage = useAppSelector((state) => state.profile.language);

  return (
    <View testID="VerificationCounter" style={!sizeSmall && doHaveUrl ? styles.horizontal : styles.vertical}>
      <Text
        style={[
          styles.textGray,
          currentLanguage === LANGUAGE_ENGLISH
            ? styles.widthGrayEng
            : styles.widthGrayGer,
        ]}
      >
        {t("my_profile.verified_gray")}
      </Text>
      <Text
        style={[
          styles.textBlack,
          currentLanguage === LANGUAGE_ENGLISH
            ? styles.widthBlackEng
            : styles.widthBlackGer,
        ]}
      >
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
    fontFamily: "OS-SB",
    fontSize: 16,
    fontWeight: "600",
    color: "#202020",
    textAlign: "right",
  },
  textGray: {
    fontSize: 16,
    fontWeight: "400",
    color: "#909090",
    textAlign: "left",
  },
  widthBlackEng: {
    width: "35%",
  },
  widthGrayEng: {
    width: "65%",
  },
  widthBlackGer: {
    width: "60%",
  },
  widthGrayGer: {
    width: "40%",
  },
});

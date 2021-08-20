import React from "react";
import { StyleSheet, View } from "react-native";
import DefaultText from "../../../basics/typography/DefaultText";
import MultilineTextField from "../../../components/MultilineTextField";
import { useI18n } from "../../../../translator/i18n";
import { useAppSelector } from "../../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";

export default function ProductDescriptionForm() {
  const { t } = useI18n();
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  return (
    <View style={styles.container}>
      <DefaultText
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.titleTwo`
        )}
        style={styles.titleTwo}
      />
      <MultilineTextField
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 500,
    paddingHorizontal: 16,
  },
  titleTwo: {
    fontSize: 16,
  },
});

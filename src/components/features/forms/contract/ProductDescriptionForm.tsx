import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import DefaultText from "../../../basics/typography/DefaultText";
import MultilineTextField from "../../../components/MultilineTextField";
import { useI18n } from "../../../../translator/i18n";
import { useAppSelector } from "../../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import IconButton from "../../../basics/buttons/IconButton";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import { toggleBoolValue } from "../../../../utils/toggleBoolValue";

export default function ProductDescriptionForm() {
  const { t } = useI18n();
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const [checked, setChecked] = useState(false);
  const checkboxHandler = () => toggleBoolValue(checked, setChecked);

  return (
    <View style={styles.container}>
      <ScrollView>
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
        <IconButton
          text={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.button`
          )}
          onPress={() => {}}
        />
        <Checkbox
          isChecked={checked}
          onChange={checkboxHandler}
          text={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.checkbox`
          )}
          textStyle={styles.checkboxText}
          style={styles.checkbox}
        />
        {checked ? (
          <>
            <IconButton
              text={t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.button`
              )}
              onPress={() => {}}
            />
            <DefaultText
              text={t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.titleThree`
              )}
              style={[styles.titleTwo, styles.titleThree]}
            />
            <MultilineTextField
              placeholder={t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
              )}
            />
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    height: 500,
    paddingHorizontal: 16,
  },
  titleTwo: {
    fontSize: 16,
  },
  titleThree: {
    marginTop: 23,
  },
  checkbox: {
    marginVertical: 23,
  },
  checkboxText: {
    width: "85%",
    marginLeft: 18,
    fontSize: 16,
  },
});

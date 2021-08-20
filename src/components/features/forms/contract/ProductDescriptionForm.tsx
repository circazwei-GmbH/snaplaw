import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
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
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);

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
      <IconButton
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.button`
        )}
        onPress={() => {}}
      />
      <Checkbox
        isChecked={first}
        onChange={() => toggleBoolValue(first, setFirst)}
        textView={
          <Text style={styles.checkboxText}>
            fhglaskduhfgailurkhgfalskdjufughaeuirghaklerdsughaeklirughalekrughafjrgkekrgjherguherlughaergaewrtgwaerghawergeqgrwegqerggrsthgwrthwrthwrthwrthwrth
          </Text>
        }
      />
    </View>
  );
}
//t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.checkbox`)

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 500,
    paddingHorizontal: 16,
  },
  titleTwo: {
    fontSize: 16,
  },
  checkbox: {
    marginTop: 26,
  },
  checkboxText: {
    width: "85%",
    marginLeft: 18,
    fontSize: 16,
    marginTop: 50,
  },
});

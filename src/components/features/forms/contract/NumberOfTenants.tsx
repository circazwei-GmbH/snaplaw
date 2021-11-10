import { t } from "i18n-js";
import React from "react";
import { View } from "react-native";
import { useAppSelector } from "../../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { useI18n } from "../../../../translator/i18n";
import DefaultText from "../../../basics/typography/DefaultText";
import TextField from "../../../components/TextField";

export default function NumberOfTenants() {
  const { t } = useI18n();

  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const screenErrors = useAppSelector(
    (state) => state.contract.contractErrors?.[CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS]
  );

  return (
    <View>
      <DefaultText
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS}.text`
        )}
      />
      {/* <TextField
          keyboardType="numeric"
          errorMessage={screenErrors}
          containerStyle={styles.costField}
          value={cost}
          onChangeFunction={onChangeFunction}
          placeholder={placeholder}
        /> */}
    </View>
  );
}

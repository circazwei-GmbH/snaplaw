import { t } from "i18n-js";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import {
  NumberOfTenantsScreenInterface,
  NUMBER_OF_TENANTS_FIELDS,
} from "../../../../store/modules/contract/number-of-tenants-data";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { useI18n } from "../../../../translator/i18n";
import DefaultSwitch from "../../../basics/switches/DefaultSwitch";
import DefaultText from "../../../basics/typography/DefaultText";
import TextField from "../../../components/TextField";

export default function NumberOfTenants() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const screenData = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS
      ) as NumberOfTenantsScreenInterface
  );
  const screenErrors = useAppSelector(
    (state) =>
      state.contract.contractErrors?.[CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS]
  );

  const onChangeAction = (
    value: string | boolean,
    fieldName: NUMBER_OF_TENANTS_FIELDS
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS,
        fieldName,
        value,
      })
    );

    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS)
      );
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <DefaultText
          text={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS}.text`
          )}
        />

        <TextField
          keyboardType="numeric"
          errorMessage={screenErrors?.[NUMBER_OF_TENANTS_FIELDS.NUMBER]}
          value={screenData?.data[NUMBER_OF_TENANTS_FIELDS.NUMBER]}
          onChangeFunction={(newValue) =>
            onChangeAction(newValue, NUMBER_OF_TENANTS_FIELDS.NUMBER)
          }
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS}.placeholder`
          )}
        />
      </View>

      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS}.switch`
        )}
        onChange={(newValue) =>
          onChangeAction(newValue, NUMBER_OF_TENANTS_FIELDS.ANOTHER_PERSON)
        }
        value={screenData?.data[NUMBER_OF_TENANTS_FIELDS.ANOTHER_PERSON]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
});

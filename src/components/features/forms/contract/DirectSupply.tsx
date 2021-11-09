import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import {
  DirectSupplyScreenInterface,
  DIRECT_SUPPLY_FIELDS,
  DIRECT_SUPPLY_FIELDS_ARR,
} from "../../../../store/modules/contract/direct-supply-data";
import { getCheckboxesList } from "../../../../store/modules/contract/helper";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { useI18n } from "../../../../translator/i18n";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import DefaultText from "../../../basics/typography/DefaultText";

export default function DirectSupply() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const directSupplyScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY
      ) as DirectSupplyScreenInterface | undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const directSupplyArray = getCheckboxesList(
    DIRECT_SUPPLY_FIELDS_ARR,
    CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY,
    t,
    directSupplyScreen?.data,
    contractType
  );

  const onChangeAction = (
    value: string | boolean,
    fieldName: DIRECT_SUPPLY_FIELDS
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY,
        fieldName,
        value: value,
      })
    );
  };

  return (
    <View style={styles.container}>
      <DefaultText
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY}.text`
        )}
      />

      {directSupplyArray.map((item) => (
        <Checkbox
          key={item.name}
          testID={item.name}
          style={styles.checkboxes}
          isChecked={item.checked}
          onChange={() => onChangeAction(!item.checked, item.name)}
          text={item.translate}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
  },
  checkboxes: {
    marginTop: 10,
  },
});

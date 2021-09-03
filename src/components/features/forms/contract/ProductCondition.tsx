import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  CONDITION_VALUE,
  CONDITIONS,
  ProductConditionScreenInterface,
} from "../../../../store/modules/contract/types";
import { setScreenData } from "../../../../store/modules/contract/slice";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../store/modules/contract/constants";
import { PRODUCT_CONDITION_FIELD_NAME } from "../../../../store/modules/contract/purchase/product-condition";
import { useI18n } from "../../../../translator/i18n";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import DefaultText from "../../../basics/typography/DefaultText";

export default function ProductCondition() {
  const dispatch = useAppDispatch();
  const { t } = useI18n();
  const currentValue = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION
      ) as ProductConditionScreenInterface | undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const screenErrors = useAppSelector(
    (state) =>
      state.contract.contractErrors?.[CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION]
  );

  const setSelected = (value: CONDITION_VALUE) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION,
        fieldName: PRODUCT_CONDITION_FIELD_NAME,
        value,
      })
    );
    if (screenErrors?.[PRODUCT_CONDITION_FIELD_NAME] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION)
      );
    }
  };

  return (
    <View style={styles.container}>
      {CONDITIONS.map((condition, index) => (
        <Checkbox
          style={index === 0 ? undefined : styles.checkbox}
          key={condition}
          isError={!!screenErrors?.[PRODUCT_CONDITION_FIELD_NAME]}
          text={t(
            `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION}.checkboxes.${condition}`
          )}
          isChecked={
            currentValue?.data[PRODUCT_CONDITION_FIELD_NAME] === condition
          }
          onChange={() => setSelected(condition)}
        />
      ))}
      {screenErrors?.[PRODUCT_CONDITION_FIELD_NAME] ? (
        <View style={styles.errorContainer}>
          <Text style={styles.dot}>*</Text>
          <DefaultText
            style={styles.errorText}
            text={screenErrors?.[PRODUCT_CONDITION_FIELD_NAME]}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  checkbox: {
    marginTop: 10,
  },
  errorContainer: {
    flexDirection: "row",
    marginTop: 18,
  },
  dot: {
    paddingRight: 10,
    color: "#FA7171",
    fontSize: 16,
  },
  errorText: {
    fontFamily: "OS-SB",
  },
});

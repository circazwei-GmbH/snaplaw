import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useI18n } from "../../../../translator/i18n";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import {
  SELLER_TYPE_VALUE,
  SELLER_TYPES,
  SellerTypeScreenInterface,
} from "../../../../store/modules/contract/types";
import {
    CONTRACT_SCREEN_TYPES,
    CONTRACT_TYPES,
} from "../../../../store/modules/contract/constants";
import { SELLER_TYPE_FIELD_NAME } from "../../../../store/modules/contract/carSales/seller-type";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import AbstractErrorMessage from "../../../basics/typography/AbstractErrorMessage";
import DefaultText from "../../../basics/typography/DefaultText";

export default function SellerType() {
  const dispatch = useAppDispatch();
  const { t } = useI18n();
  const currentValue = useAppSelector(
    (state) => 
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.SELLER_TYPE
      ) as SellerTypeScreenInterface | undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const screenErrors = useAppSelector(
    (state) =>
      state.contract.contractErrors?.[CONTRACT_SCREEN_TYPES.SELLER_TYPE]
  );

  const setSelected = (value: SELLER_TYPE_VALUE) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SELLER_TYPE,
        fieldName: SELLER_TYPE_FIELD_NAME,
        value,
      })
    );
    if (screenErrors?.[SELLER_TYPE_FIELD_NAME] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.SELLER_TYPE)
      );
    }
  };

  return (
    <View style={styles.container}>
        <DefaultText 
          style={styles.title} 
          text={t(`contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SELLER_TYPE}.secondTitle`)}
        />
      {SELLER_TYPES.map((type, index) => (
        <Checkbox
          style={index === 0 ? undefined : styles.checkbox}
          key={type}
          isError={!!screenErrors?.[SELLER_TYPE_FIELD_NAME]}
          text={t(
            `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SELLER_TYPE}.checkboxes.${type}`
          )}
          isChecked={
            currentValue?.data[SELLER_TYPE_FIELD_NAME] === type
          }
          onChange={() => setSelected(type)}
        />
      ))}
      <AbstractErrorMessage
        message={screenErrors?.[SELLER_TYPE_FIELD_NAME]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    paddingBottom: 23,
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

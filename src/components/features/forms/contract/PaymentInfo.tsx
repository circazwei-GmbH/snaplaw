import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import {
  PaymentInfoScreenInterface,
  PAYMENT_INFO_FIELDS,
  PAYMENT_INFO_FIELDS_ARR,
} from "../../../../store/modules/contract/carSales/payment-info";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../store/modules/contract/slice";

import { useI18n } from "../../../../translator/i18n";
import TextField from "../../../components/TextField";

export default function PaymentInfo() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const paymentInfo = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PAYMENT_INFO
      ) as PaymentInfoScreenInterface | undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.PAYMENT_INFO]
      : undefined
  );

  const onChangeAction = (value: string, fieldName: PAYMENT_INFO_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT_INFO,
        fieldName,
        value,
      })
    );
    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.PAYMENT_INFO)
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        {PAYMENT_INFO_FIELDS_ARR.map((field) => (
          <TextField
            value={paymentInfo?.data[field]}
            errorMessage={screenErrors?.[field]}
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT_INFO}.placeholders.${field}`
            )}
            onChangeFunction={(newValue) => onChangeAction(newValue, field)}
            key={field}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputBox: {
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  switchPadding: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  switchText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
});

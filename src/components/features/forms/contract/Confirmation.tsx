import React from "react";
import {StyleSheet, View} from "react-native";
import {
  CONFIRMATION,
  CONFIRMATION_FIELDS,
  ConfirmationScreenInterface,
} from "../../../../store/modules/contract/types";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import {useI18n} from "../../../../translator/i18n";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {CONTRACT_SCREEN_TYPES} from "../../../../store/modules/contract/constants";
import {setScreenData} from "../../../../store/modules/contract/slice";
import {validateScreen} from "../../../../store/modules/contract/action-creators";

export default function Confirmation() {
  const { t } = useI18n();
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const confirmationScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.CONFIRMATION
      ) as ConfirmationScreenInterface | undefined
  );
  const screenError = useAppSelector(state => state.contract.contractErrors?.[CONTRACT_SCREEN_TYPES.CONFIRMATION])
  const dispatch = useAppDispatch();

  const confirmationHandler = (confirmation: CONFIRMATION_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.CONFIRMATION,
        fieldName: confirmation,
        value: !confirmationScreen?.data[confirmation],
      })
    );
    if (screenError?.[confirmation] && contractType) {
      dispatch(validateScreen(contractType, CONTRACT_SCREEN_TYPES.CONFIRMATION))
    }
  };

  if (!contractType) {
    return null;
  }

  return (
    <View style={styles.container}>
      {CONFIRMATION.map((confirmation, index) => (
        <Checkbox
          style={index === 0 ? null : styles.checkbox}
          isError={!!screenError?.[confirmation]}
          errorMessage={screenError?.[confirmation]}
          key={confirmation}
          isChecked={!!confirmationScreen?.data[confirmation]}
          onChange={() => confirmationHandler(confirmation)}
          text={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.confirmation.${confirmation}`
          )}
        />
      ))}
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
});

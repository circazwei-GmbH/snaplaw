import React from "react";
import { StyleSheet, View } from "react-native";
import {
  CONFIRMATION,
  CONFIRMATION_FIELDS,
  ConfirmationScreenInterface,
} from "../../../../store/modules/contract/types";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import { useI18n } from "../../../../translator/i18n";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import { CONTRACT_ROLE } from "../../../../store/modules/contract/contract-roles";
import DefaultText from "../../../basics/typography/DefaultText";

export default function Confirmation() {
  const { t } = useI18n();
  const contract = useAppSelector((state) => state.contract.currentContract);
  const confirmationScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.CONFIRMATION
      ) as ConfirmationScreenInterface | undefined
  );
  const screenError = useAppSelector(
    (state) =>
      state.contract.contractErrors?.[CONTRACT_SCREEN_TYPES.CONFIRMATION]
  );
  const dispatch = useAppDispatch();

  const confirmationHandler = (confirmation: CONFIRMATION_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.CONFIRMATION,
        fieldName: confirmation,
        value: !confirmationScreen?.data[confirmation],
      })
    );
    if (screenError?.[confirmation] && contract) {
      dispatch(
        validateScreen(contract.type, CONTRACT_SCREEN_TYPES.CONFIRMATION)
      );
    }
  };

  if (!contract) {
    return null;
  }

  return (
    <View style={styles.container}>
      {contract.meRole === CONTRACT_ROLE.PARTNER ? (
        <DefaultText
          style={styles.text}
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.partner_text`
          )}
        />
      ) : null}
      {
        //@ts-ignore
        Object.keys(CONFIRMATION).map(
          (confirmation: CONFIRMATION_FIELDS, index) => {
            if (CONFIRMATION[confirmation].includes(contract.meRole)) {
              return (
                <Checkbox
                  style={index === 0 ? null : styles.checkbox}
                  isError={!!screenError?.[confirmation]}
                  errorMessage={screenError?.[confirmation]}
                  key={confirmation}
                  isChecked={!!confirmationScreen?.data[confirmation]}
                  onChange={() => confirmationHandler(confirmation)}
                  text={t(
                    `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.confirmation.${confirmation}`
                  )}
                />
              );
            }
            return null;
          }
        )
      }
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
  text: {
    fontSize: 16,
  },
});

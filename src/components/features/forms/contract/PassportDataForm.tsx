import React from "react";
import { StyleSheet, View } from "react-native";
import TextField from "../../../components/TextField";
import { useI18n } from "../../../../translator/i18n";
import { useDispatch } from "react-redux";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import {
  PassportDataScreenInterface,
  PASSPORT_DATA_FIELDS,
  PASSPORT_DATA_FIELDS_ARR,
} from "../../../../store/modules/contract/passport-data";

export default function PassportDataForm(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useDispatch();

  const passportData = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PASSPORT_DATA
      ) as PassportDataScreenInterface | undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.PASSPORT_DATA]
      : undefined
  );
  const onChangeAction = (value: string, fieldName: PASSPORT_DATA_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PASSPORT_DATA,
        fieldName,
        value,
      })
    );
    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.PASSPORT_DATA)
      );
    }
  };

  return (
    <View style={styles.inputBox}>
      {PASSPORT_DATA_FIELDS_ARR.map((field) => (
        <TextField
          key={field}
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PASSPORT_DATA}.placeholders.${field}`
          )}
          errorMessage={screenErrors?.[field]}
          value={passportData?.data[field]}
          onChangeFunction={(newValue) => onChangeAction(newValue, field)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 16,
  },
  formTitle: {
    fontWeight: "600",
    fontFamily: "OS-SB",
  },
});

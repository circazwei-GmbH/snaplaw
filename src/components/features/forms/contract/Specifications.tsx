import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import TextField from "../../../components/TextField";
import {
  PRODUCT_DATA_FIELDS,
  ProductDataScreenInterface,
} from "../../../../store/modules/contract/types";
import { useI18n } from "../../../../translator/i18n";
import DefaultText from "../../../basics/typography/DefaultText";
import DefaultSwitch from "../../../basics/switches/DefaultSwitch";
import { toggleBoolValue } from "../../../../utils/toggleBoolValue";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../store/modules/contract/action-creators";

export default function Specifications(): JSX.Element {
  const productData = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PRODUCT_DATA
      ) as ProductDataScreenInterface | undefined
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.PRODUCT_DATA]
      : undefined
  );

  const { t } = useI18n();
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const dispatch = useAppDispatch();

  const [haveSerial, setHaveSerial] = useState<boolean>(false);
  const toggleHaveSerial = () => {
    toggleBoolValue(haveSerial, setHaveSerial);
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName: PRODUCT_DATA_FIELDS.isSerial,
        value: !haveSerial,
      })
    );
  };

  const onChangeAction = (value: string, fieldName: PRODUCT_DATA_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName,
        value,
      })
    );
    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.PRODUCT_DATA)
      );
    }
  };

  return (
    <View style={styles.container}>
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
        )}
        onChange={toggleHaveSerial}
        value={haveSerial}
      />
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
        )}
        onChange={toggleHaveSerial}
        value={haveSerial}
      />
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
        )}
        onChange={toggleHaveSerial}
        value={haveSerial}
      />
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
        )}
        onChange={toggleHaveSerial}
        value={haveSerial}
      />
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
        )}
        onChange={toggleHaveSerial}
        value={haveSerial}
      />
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
        )}
        onChange={toggleHaveSerial}
        value={haveSerial}
      />
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

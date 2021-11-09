import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
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
import CheckboxesList from "../../../components/CheckboxesList";

export default function DirectSupply() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const directSupplyScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY
      ) as DirectSupplyScreenInterface | undefined
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY]
      : undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const photos = directSupplyScreen?.data[DIRECT_SUPPLY_FIELDS.PHOTOS];

  const onChangeAction = (
    value: string | boolean,
    fieldName: DIRECT_SUPPLY_FIELDS = DIRECT_SUPPLY_FIELDS.DESCRIPTION
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY,
        fieldName,
        value: value,
      })
    );

    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY)
      );
    }
  };

  return (
    <View>
      <DefaultText
        style={styles.text}
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY}.text`
        )}
      />

      <CheckboxesList
        list={getCheckboxesList(
          DIRECT_SUPPLY_FIELDS_ARR,
          CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY,
          t,
          directSupplyScreen?.data,
          contractType
        )}
        updateDataHandler={onChangeAction}
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY}.titleMultiline`
        )}
        iconText={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY}.uploadFiles`
        )}
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY}.placeholder`
        )}
        photosFieldName={DIRECT_SUPPLY_FIELDS.PHOTOS}
        photos={photos ?? []}
        errorMessage={screenErrors?.[DIRECT_SUPPLY_FIELDS.DESCRIPTION]}
        description={
          directSupplyScreen?.data[DIRECT_SUPPLY_FIELDS.DESCRIPTION] ?? ""
        }
        screenType={CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 17,
  },
});

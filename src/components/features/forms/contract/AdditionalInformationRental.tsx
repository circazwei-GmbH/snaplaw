import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  AdditionalInfoRentalScreenInterface,
  ADDITIONAL_INFO_RENTAL_FIELDS,
  ADDITIONAL_INFO_RENTAL_FIELDS_ARR,
} from "../../../../store/modules/contract/additional-info-rental-data";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { getCheckboxesList } from "../../../../store/modules/contract/helper";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { useI18n } from "../../../../translator/i18n";
import DefaultSwitch from "../../../basics/switches/DefaultSwitch";
import DefaultText from "../../../basics/typography/DefaultText";

export default function AdditionalInfoRental() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const additionalInfoScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO
      ) as AdditionalInfoRentalScreenInterface | undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const additionalInfoArray = getCheckboxesList(
    ADDITIONAL_INFO_RENTAL_FIELDS_ARR,
    CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO,
    t,
    additionalInfoScreen?.data,
    contractType
  );

  const onChangeAction = (
    value: string | boolean,
    fieldName: ADDITIONAL_INFO_RENTAL_FIELDS
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO,
        fieldName,
        value: value,
      })
    );
  };

  return (
    <View>
      <DefaultText
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.text`
        )}
        style={styles.text}
      />

      {additionalInfoArray.map((item) => (
        <DefaultSwitch
          key={item.name}
          title={item.translate}
          onChange={() => onChangeAction(!item.checked, item.name)}
          value={item.checked}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxes: {
    marginTop: 10,
  },
  text: {
    paddingHorizontal: 17,
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { getCheckboxesList } from "../../../../store/modules/contract/helper";
import {
  RentalPropertyScreenInterface,
  RENTAL_PROPERTY_FIELDS,
  RENTAL_PROPERTY_FIELDS_ARR,
} from "../../../../store/modules/contract/rental-property-data";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { useI18n } from "../../../../translator/i18n";
import Checkbox from "../../../basics/checkboxes/Checkbox";

export default function RentalProperty() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  
  const rentalPropertyScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.RENTAL_PROPERTY
      ) as RentalPropertyScreenInterface | undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const rentalPropertyArray = getCheckboxesList(
    RENTAL_PROPERTY_FIELDS_ARR,
    CONTRACT_SCREEN_TYPES.RENTAL_PROPERTY,
    t,
    rentalPropertyScreen?.data,
    contractType
  );

  const onChangeAction = (
    value: string | boolean,
    fieldName: RENTAL_PROPERTY_FIELDS
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.RENTAL_PROPERTY,
        fieldName,
        value: value,
      })
    );
  };

  return (
    <View style={styles.container}>
      {rentalPropertyArray.map((item) => (
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

import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import TextField from "../../../components/TextField";
import {PRODUCT_DATA_FIELDS, ProductDataScreenInterface} from "../../../../store/modules/contract/types";
import {useI18n} from "../../../../translator/i18n";
import DefaultText from "../../../basics/typography/DefaultText";
import DefaultSwitch from "../../../basics/switches/DefaultSwitch";
import {toggleBoolValue} from "../../../../utils/toggleBoolValue";
import {CONTRACT_SCREEN_TYPES} from "../../../../store/modules/contract/constants";
import {setScreenData} from "../../../../store/modules/contract/slice";

export default function ProductDataForm(): JSX.Element {
  const productData = useAppSelector(
      (state => state.contract.currentContract?.screens.find(screen => screen.type === CONTRACT_SCREEN_TYPES.PRODUCT_DATA) as ProductDataScreenInterface | undefined)
  )
  const { t } = useI18n();
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const dispatch = useAppDispatch()

  const [haveSerial, setHaveSerial] = useState<boolean>(false);
  const toggleHaveSerial = () => toggleBoolValue(haveSerial, setHaveSerial);

  const onChangeAction = (value: string, fieldName: PRODUCT_DATA_FIELDS) => {
    dispatch(
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
          fieldName,
          value,
        })
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <TextField
          value={productData?.data[PRODUCT_DATA_FIELDS.subject]}
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.subject`
          )}
          onChangeFunction={(newValue) => onChangeAction(newValue, PRODUCT_DATA_FIELDS.subject)}
        />
        <TextField
          value={productData?.data[PRODUCT_DATA_FIELDS.producer]}
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.producer`
          )}
          onChangeFunction={(newValue) => onChangeAction(newValue, PRODUCT_DATA_FIELDS.producer)}
        />
        <TextField
          value={productData?.data[PRODUCT_DATA_FIELDS.description]}
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.designation`
          )}
          onChangeFunction={(newValue) =>
            onChangeAction(newValue, PRODUCT_DATA_FIELDS.description)
          }
        />
      </View>
      <DefaultText
        text={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.switchTitle`)}
        style={[styles.switchText, styles.switchPadding]}
      />
      <DefaultSwitch
        title={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`)}
        onChange={toggleHaveSerial}
        value={haveSerial}
      />
      {haveSerial ? (
        <View style={styles.inputBox}>
          <TextField
            value={productData?.data[PRODUCT_DATA_FIELDS.serial]}
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serial`
            )}
            onChangeFunction={(newValue) => onChangeAction(newValue, PRODUCT_DATA_FIELDS.serial)}
          />
        </View>
      ) : null}
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

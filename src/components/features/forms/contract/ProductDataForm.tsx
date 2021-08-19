import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useAppSelector } from "../../../../store/hooks";
import TextField from "../../../components/TextField";
import { ProductDataType } from "../../../../store/modules/contract/types";
import { useI18n } from "../../../../translator/i18n";
import DefaultText from "../../../basics/typography/DefaultText";
import DefaultSwitch from "../../../basics/switches/DefaultSwitch";
import { toggleBoolValue } from "../../../../utils/toggleBoolValue";

interface ProductDataFormPropsInterface {
  form?: ProductDataType;
  onChangeAction: Function;
}

export default function ProductDataForm({
  form,
  onChangeAction,
}: ProductDataFormPropsInterface): JSX.Element {
  const { t } = useI18n();
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const [haveSerial, setHaveSerial] = useState<boolean>(false);
  const toggleHaveSerial = () => toggleBoolValue(haveSerial, setHaveSerial);

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <TextField
          value={form?.subject}
          placeholder={t(
            `contracts.${contractType}.product_data.placeholders.subject`
          )}
          onChangeFunction={(newValue) => onChangeAction(newValue, "subject")}
        />
        <TextField
          value={form?.producer}
          placeholder={t(
            `contracts.${contractType}.product_data.placeholders.producer`
          )}
          onChangeFunction={(newValue) => onChangeAction(newValue, "producer")}
        />
        <TextField
          value={form?.designation}
          placeholder={t(
            `contracts.${contractType}.product_data.placeholders.designation`
          )}
          onChangeFunction={(newValue) =>
            onChangeAction(newValue, "designation")
          }
        />
      </View>
      <DefaultText
        text={t(`contracts.${contractType}.product_data.switchTitle`)}
        style={[styles.switchText, styles.switchPadding]}
      />
      <DefaultSwitch
        title={t(`contracts.${contractType}.product_data.placeholders.serial`)}
        onChange={toggleHaveSerial}
        value={haveSerial}
      />
      {haveSerial ? (
        <View style={styles.inputBox}>
          <TextField
            value={form?.serial}
            placeholder={t(
              `contracts.${contractType}.product_data.placeholders.serial`
            )}
            onChangeFunction={(newValue) => onChangeAction(newValue, "serial")}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 500,
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

import React from "react";
import { View, StyleSheet } from "react-native";
import { UserType } from "../../../store/../store/modules/profile/slice";
import TextField from "../../components/TextField";
import DefaultText from "../../basics/typography/DefaultText";
import { useI18n } from "../../../translator/i18n";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface UserDataFormPropsInterface {
  edit: boolean;
  localValue: UserType;
  onChangeAction: Function;
}

export default function UserDataForm({
  edit,
  localValue,
  onChangeAction,
}: UserDataFormPropsInterface): JSX.Element {
  const { t } = useI18n();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.inputBox}>
        <DefaultText
          text={t("purchase_contract.user_data")}
          style={styles.formTitle}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.name")}
          onChangeFunction={(newValue) => onChangeAction(newValue, "name")}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.lastName")}
          onChangeFunction={(newValue) => onChangeAction(newValue, "lastName")}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.dateOfBirth")}
          onChangeFunction={(newValue) =>
            onChangeAction(newValue, "dateOfBirth")
          }
        />
        <TextField
          placeholder={t("edit_profile.placeholders.email")}
          onChangeFunction={(newValue) => onChangeAction(newValue, "email")}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.phone")}
          onChangeFunction={(newValue) => onChangeAction(newValue, "phone")}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.address")}
          onChangeFunction={(newValue) => onChangeAction(newValue, "address")}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.postCode")}
          onChangeFunction={(newValue) => onChangeAction(newValue, "postCode")}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    justifyContent: "flex-start",
    width: "100%",
    height: 520,
    paddingHorizontal: 16,
  },
  formTitle: {
    fontWeight: "600",
    fontFamily: "OS-SB",
  },
});

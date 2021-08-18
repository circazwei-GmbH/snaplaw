import React from "react";
import { View, StyleSheet } from "react-native";
import { UserType } from "../../../../store/modules/profile/slice";
import TextField from "../../../components/TextField";
import { useI18n } from "../../../../translator/i18n";

interface UserDataFormPropsInterface {
  form?: UserType;
  onChangeAction: Function;
}

export default function UserDataForm({
  form,
  onChangeAction,
}: UserDataFormPropsInterface): JSX.Element {
  const { t } = useI18n();

  return (
    <View style={styles.inputBox}>
      <TextField
        value={form?.name}
        placeholder={t("edit_profile.placeholders.name")}
        onChangeFunction={(newValue) => onChangeAction(newValue, "name")}
      />
      <TextField
        value={form?.lastName}
        placeholder={t("edit_profile.placeholders.lastName")}
        onChangeFunction={(newValue) => onChangeAction(newValue, "lastName")}
      />
      <TextField
        value={form?.dateOfBirth}
        placeholder={t("edit_profile.placeholders.dateOfBirth")}
        onChangeFunction={(newValue) => onChangeAction(newValue, "dateOfBirth")}
      />
      <TextField
        value={form?.email}
        placeholder={t("edit_profile.placeholders.email")}
        onChangeFunction={(newValue) => onChangeAction(newValue, "email")}
      />
      <TextField
        value={form?.phone}
        placeholder={t("edit_profile.placeholders.phone")}
        onChangeFunction={(newValue) => onChangeAction(newValue, "phone")}
      />
      <TextField
        value={form?.address}
        placeholder={t("edit_profile.placeholders.address")}
        onChangeFunction={(newValue) => onChangeAction(newValue, "address")}
      />
      <TextField
        value={form?.postCode}
        placeholder={t("edit_profile.placeholders.postCode")}
        onChangeFunction={(newValue) => onChangeAction(newValue, "postCode")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    justifyContent: "flex-start",
    width: "100%",
    height: 500,
    paddingHorizontal: 16,
  },
});

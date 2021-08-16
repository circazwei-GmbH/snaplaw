import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import EditProfileTextField from "../../components/EditProfileTextField";
import { UserType } from "../../../store/../store/modules/profile/slice";
import { useI18n } from "../../../translator/i18n";

interface EditProfileFormPropsInterface {
  edit: boolean;
  localValue: UserType;
  onChangeAction: Function;
}

export default function EditProfileForm({
  edit,
  localValue,
  onChangeAction,
}: EditProfileFormPropsInterface): JSX.Element {
  const { t } = useI18n();

  return (
    <View style={styles.inputBox}>
      <EditProfileTextField
        placeholder={t("edit_profile.placeholders.name")}
        value={localValue.name}
        editable={edit}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "name")}
      />
      <EditProfileTextField
        placeholder={t("edit_profile.placeholders.lastName")}
        value={localValue.lastName}
        editable={edit}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "lastName")}
      />
      <EditProfileTextField
        placeholder={t("edit_profile.placeholders.dateOfBirth")}
        value={localValue.dateOfBirth}
        editable={edit}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "dateOfBirth")}
      />
      <EditProfileTextField
        placeholder={t("edit_profile.placeholders.email")}
        value={localValue.email}
        editable={false}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "email")}
      />
      <EditProfileTextField
        placeholder={t("edit_profile.placeholders.phone")}
        value={localValue.phone}
        editable={edit}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "phone")}
      />
      <EditProfileTextField
        placeholder={t("edit_profile.placeholders.address")}
        value={localValue.address}
        editable={edit}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "address")}
      />
      <EditProfileTextField
        placeholder={t("edit_profile.placeholders.postCode")}
        value={localValue.postCode}
        editable={edit}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "postCode")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    justifyContent: "flex-start",
    width: "100%",
  },
});

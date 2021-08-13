import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import EditProfileTextField from "../../components/EditProfileTextField";
import { UserType } from "../../../store/../store/modules/profile/slice";

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
  return (
    <View style={styles.inputBox}>
      <EditProfileTextField
        placeholder={"First name"}
        value={localValue.name}
        editable={edit}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "name")}
      />
      <EditProfileTextField
        placeholder={"Last Name"}
        value={localValue.lastName}
        editable={edit}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "lastName")}
      />
      <EditProfileTextField
        placeholder={"Date of birth"}
        value={localValue.dateOfBirth}
        editable={edit}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "dateOfBirth")}
      />
      <EditProfileTextField
        placeholder={"E-Mail"}
        value={localValue.email}
        editable={false}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "email")}
      />
      <EditProfileTextField
        placeholder={"Phone"}
        value={localValue.phone}
        editable={edit}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "phone")}
      />
      <EditProfileTextField
        placeholder={"Address"}
        value={localValue.address}
        editable={edit}
        edit={edit}
        onChangeFunction={(newValue) => onChangeAction(newValue, "address")}
      />
      <EditProfileTextField
        placeholder={"Postal code"}
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

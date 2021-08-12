import React from "react";
import { View, StyleSheet } from "react-native";
import EditProfileTextField from "../../components/EditProfileTextField";

interface EditProfileFormPropsInterface {
  edit: boolean;
}

export default function EditProfileForm({
  edit,
}: EditProfileFormPropsInterface): JSX.Element {
  return (
    <View style={styles.inputBox}>
      <EditProfileTextField
        placeholder={"First name"}
        value={"Vladislav"}
        editable={edit}
        edit={edit}
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

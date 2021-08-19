import React from "react";
import { View, StyleSheet } from "react-native";
import EditProfileTextField from "../../components/EditProfileTextField";
import { useI18n } from "../../../translator/i18n";
import { FieldInterface } from "../../features/forms/SignInForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface EditProfileFieldInterface extends FieldInterface {
  value?: string;
}

export interface EditProfileFormInterface {
  name: EditProfileFieldInterface;
  lastName: EditProfileFieldInterface;
  dateOfBirth: EditProfileFieldInterface;
  email: EditProfileFieldInterface;
  phone: EditProfileFieldInterface;
  address: EditProfileFieldInterface;
  postCode: EditProfileFieldInterface;
}

interface EditProfileFormPropsInterface {
  edit: boolean;
  form: EditProfileFormInterface;
  onChangeHandler: Function;
}

export default function EditProfileForm({
  edit,
  form,
  onChangeHandler,
}: EditProfileFormPropsInterface): JSX.Element {
  const { t } = useI18n();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.inputBox}>
        <EditProfileTextField
          placeholder={t("edit_profile.placeholders.name")}
          value={form.name.value}
          editable={edit}
          edit={edit}
          textContentType="username"
          onChangeFunction={(newValue) => onChangeHandler(newValue, "name")}
        />
        <EditProfileTextField
          placeholder={t("edit_profile.placeholders.lastName")}
          value={form.lastName.value}
          editable={edit}
          edit={edit}
          onChangeFunction={(newValue) => onChangeHandler(newValue, "lastName")}
        />
        <EditProfileTextField
          placeholder={t("edit_profile.placeholders.dateOfBirth")}
          value={form.dateOfBirth.value}
          editable={edit}
          edit={edit}
          onChangeFunction={(newValue) =>
            onChangeHandler(newValue, "dateOfBirth")
          }
        />
        <EditProfileTextField
          placeholder={t("edit_profile.placeholders.email")}
          value={form.email.value}
          editable={false}
          edit={edit}
          onChangeFunction={(newValue) => onChangeHandler(newValue, "email")}
        />
        <EditProfileTextField
          placeholder={t("edit_profile.placeholders.phone")}
          value={form.phone.value}
          editable={edit}
          edit={edit}
          onChangeFunction={(newValue) => onChangeHandler(newValue, "phone")}
        />
        <EditProfileTextField
          placeholder={t("edit_profile.placeholders.address")}
          value={form.address.value}
          editable={edit}
          edit={edit}
          onChangeFunction={(newValue) => onChangeHandler(newValue, "address")}
        />
        <EditProfileTextField
          placeholder={t("edit_profile.placeholders.postCode")}
          value={form.postCode.value}
          editable={edit}
          edit={edit}
          onChangeFunction={(newValue) => onChangeHandler(newValue, "postCode")}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    justifyContent: "flex-start",
    width: "100%",
  },
});

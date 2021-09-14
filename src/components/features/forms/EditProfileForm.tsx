import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import EditProfileTextField from "../../components/EditProfileTextField";
import { useI18n } from "../../../translator/i18n";
import { FieldInterface } from "./SignInForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePickerModal from "../Modals/DatePickerModal";
import TextFieldImitation from "../../components/TextFieldImitation";
import dayjs from "dayjs";

export interface EditProfileFormInterface {
  name: FieldInterface;
  lastName: FieldInterface;
  dateOfBirth: FieldInterface;
  email: FieldInterface;
  phone: FieldInterface;
  address: FieldInterface;
  postCode: FieldInterface;
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
  const [datePickerOpened, setDatePickerOpened] = useState(false);

  return (
    <KeyboardAwareScrollView>
      <View
        style={styles.inputBox}
        onStartShouldSetResponderCapture={() => !edit}
      >
        <EditProfileTextField
          placeholder={t("edit_profile.placeholders.name")}
          value={form.name.value}
          editable={edit}
          edit={edit}
          errorMessage={form.name.error}
          textContentType="username"
          onChangeFunction={(newValue) => onChangeHandler(newValue, "name")}
        />
        <EditProfileTextField
          placeholder={t("edit_profile.placeholders.lastName")}
          value={form.lastName.value}
          editable={edit}
          edit={edit}
          errorMessage={form.lastName.error}
          onChangeFunction={(newValue) => onChangeHandler(newValue, "lastName")}
        />
        <TouchableOpacity
          onPress={() => setDatePickerOpened(true)}
          activeOpacity={0.9}
        >
          <TextFieldImitation
            placeholder={t("edit_profile.placeholders.dateOfBirth")}
            value={dayjs(form.dateOfBirth.value).format("DD.MM.YYYY")}
            settings
          />
        </TouchableOpacity>
        <TextFieldImitation
          placeholder={t("edit_profile.placeholders.email")}
          value={form.email.value}
          settings
        />
        <EditProfileTextField
          keyboardType="phone-pad"
          placeholder={t("edit_profile.placeholders.phone")}
          value={form.phone.value}
          editable={edit}
          edit={edit}
          errorMessage={form.phone.error}
          onChangeFunction={(newValue) => onChangeHandler(newValue, "phone")}
        />
        <EditProfileTextField
          placeholder={t("edit_profile.placeholders.address")}
          value={form.address.value}
          editable={edit}
          edit={edit}
          errorMessage={form.address.error}
          onChangeFunction={(newValue) => onChangeHandler(newValue, "address")}
        />
        <EditProfileTextField
          keyboardType="number-pad"
          placeholder={t("edit_profile.placeholders.postCode")}
          value={form.postCode.value}
          editable={edit}
          edit={edit}
          errorMessage={form.postCode.error}
          onChangeFunction={(newValue) => onChangeHandler(newValue, "postCode")}
        />
      </View>
      <DatePickerModal
        open={datePickerOpened}
        modalHandler={setDatePickerOpened}
        changeDate={onChangeHandler}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    justifyContent: "flex-start",
    width: "100%",
  },
});

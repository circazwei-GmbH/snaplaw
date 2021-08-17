import React, { useState, useEffect } from "react";
import TopBar from "../../layouts/TopBar";
import { useI18n } from "../../../translator/i18n";
import { View, StyleSheet } from "react-native";
import UploadAvatar from "../../features/UploadAvatar";
import TextButton from "../../basics/buttons/TextButton";
import EditProfileForm, {
  EditProfileFormInterface,
} from "../../features/forms/EditProfileForm";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { UserType, setUserProfile } from "../../../store/modules/profile/slice";
import { requestEditProfile } from "../../../store/modules/profile/action-creators";
import { email, length } from "../../../validations/default";
import { setModal } from "../../../store/modules/main/slice";

export default function EditProfile() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const userData: UserType | undefined = useAppSelector(
    (state) => state.profile.user
  );

  const globalValue: UserType = {
    name: userData?.name,
    lastName: userData?.lastName,
    dateOfBirth: userData?.dateOfBirth,
    email: userData?.email,
    phone: userData?.phone,
    address: userData?.address,
    postCode: userData?.postCode,
  };

  const formInitial: EditProfileFormInterface = {
    name: {
      value: userData?.name,
      error: "",
      displayError: false,
      validators: [length(t("sign_up.errors.name_required"), 1)],
    },
    lastName: {
      value: userData?.lastName,
      error: "",
      displayError: false,
      validators: [length(t("sign_up.errors.name_required"), 1)],
    },
    dateOfBirth: {
      value: userData?.dateOfBirth,
      error: "",
      displayError: false,
      validators: [length(t("sign_up.errors.name_required"), 1)],
    },
    email: {
      value: userData?.email,
      error: "",
      displayError: false,
      validators: [email(t("sign_up.errors.email_not_valid"))],
    },
    phone: {
      value: userData?.phone,
      error: "",
      displayError: false,
      validators: [length(t("sign_up.errors.name_required"), 1)],
    },
    address: {
      value: userData?.address,
      error: "",
      displayError: false,
      validators: [length(t("sign_up.errors.name_required"), 1)],
    },
    postCode: {
      value: userData?.postCode,
      error: "",
      displayError: false,
      validators: [length(t("sign_up.errors.name_required"), 1)],
    },
  };

  const [form, setForm] = useState<EditProfileFormInterface | any>(formInitial);
  const localForm: UserType = {
    name: form.name.value,
    lastName: form.lastName.value,
    dateOfBirth: form.dateOfBirth.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
    postCode: form.postCode.value,
  };

  const editHandler = () => setEdit(true);
  const cancelHandler = () => {
    setForm(formInitial);
    setEdit(false);
  };

  const pressSave = () => {
    dispatch(
      setModal({
        message: "Do you want to save changes you made?",
        actions: [
          {
            name: "Cancel",
            colortype: "error",
          },
          {
            action: requestEditProfile(localForm),
            name: "Confirm ",
            colortype: "primary",
          },
        ],
      })
    );
  };

  const pressCancel = () => {
    dispatch(
      setModal({
        message: "You have unsaved changes. Are you sure you want to leave?",
        actions: [
          {
            name: "No",
            colortype: "error",
          },
          {
            action: setUserProfile(globalValue),
            name: "Yes",
            colortype: "primary",
          },
        ],
      })
    );
  };

  useEffect(() => {
    cancelHandler();
  }, [userData]);

  const onChange = (newValue: string, fieldName: any) => {
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value: newValue,
      },
    });
  };

  return (
    <TopBar
      pageName={t("edit_profile.title")}
      leftButton={
        edit ? (
          <TextButton
            text={t("edit_profile.buttons_text.cancel")}
            onPress={pressCancel}
            type="left"
          />
        ) : undefined
      }
      rightButton={
        edit ? (
          <TextButton
            text={t("edit_profile.buttons_text.save")}
            onPress={pressSave}
            type="right"
          />
        ) : (
          <TextButton
            text={t("edit_profile.buttons_text.edit")}
            onPress={editHandler}
            type="right"
          />
        )
      }
    >
      <View style={styles.container}>
        <View style={styles.uploadAvatarBox}>
          <UploadAvatar />
        </View>
        <EditProfileForm edit={edit} form={form} onChangeHandler={onChange} />
      </View>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  uploadAvatarBox: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 15,
  },
});

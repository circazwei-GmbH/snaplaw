import React, { useState, useEffect } from "react";
import TopBar from "../../layouts/TopBar";
import { useI18n } from "../../../translator/i18n";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import UploadAvatar from "../../features/UploadAvatar";
import TextButton from "../../basics/buttons/TextButton";
import EditProfileForm, {
  EditProfileFormInterface,
} from "../../features/forms/EditProfileForm";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  requestEditProfile,
  requestUserProfile,
} from "../../../store/modules/profile/action-creators";
import { email, length } from "../../../validations/default";
import { formFieldFill, validate } from "../../../utils/forms";
import {
  UserTypeNoAvatar,
  setUserProfile,
  setCurretnPartner,
  UserType,
} from "../../../store/modules/profile/slice";
import { setModal } from "../../../store/modules/main/slice";
import { BUTTON_COLORTYPE } from "../../../store/modules/main/types";

type EditProfileProps = {
  route: {
    params:
      | {
          id: string | undefined;
        }
      | undefined;
  };
};

export default function EditProfile({ route }: EditProfileProps) {
  const userId = route.params?.id;
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const userData: UserType | undefined = useAppSelector((state) =>
    userId ? state.profile.currentPartner : state.profile.user
  );

  useEffect(() => {
    if (userId) {
      dispatch(requestUserProfile(userId));
      return () => {
        dispatch(setCurretnPartner(undefined));
      };
    }
  }, [userId]);

  const globalValue: UserTypeNoAvatar = {
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
      validators: [length(t("edit_profile.error"), 1)],
    },
    lastName: {
      value: userData?.lastName,
      error: "",
      displayError: false,
      validators: [length(t("edit_profile.error"), 1)],
    },
    dateOfBirth: {
      value: userData?.dateOfBirth,
      error: "",
      displayError: false,
      validators: [length(t("edit_profile.error"), 1)],
    },
    email: {
      value: userData?.email,
      error: "",
      displayError: false,
      validators: [email(t("edit_profile.error"))],
    },
    phone: {
      value: userData?.phone,
      error: "",
      displayError: false,
      validators: [length(t("edit_profile.error"), 1)],
    },
    address: {
      value: userData?.address,
      error: "",
      displayError: false,
      validators: [length(t("edit_profile.error"), 1)],
    },
    postCode: {
      value: userData?.postCode,
      error: "",
      displayError: false,
      validators: [length(t("edit_profile.error"), 1)],
    },
  };

  const [form, setForm] = useState<EditProfileFormInterface | any>(formInitial);
  
  const formToSave: UserTypeNoAvatar = {
    name: form.name.value ?? "",
    lastName: form.lastName.value ?? "",
    dateOfBirth: form.dateOfBirth.value ?? "",
    email: form.email.value ?? "",
    phone: form.phone.value ?? "",
    address: form.address.value ?? "",
    postCode: form.postCode.value ?? "",
  };

  const editHandler = () => setEdit(true);
  const cancelHandler = () => {
    setForm(formInitial);
    setEdit(false);
  };

  const pressSave = () => {
    const localForm: EditProfileFormInterface = {
      name: validate(form.name),
      lastName: validate(form.lastName),
      dateOfBirth: validate(form.dateOfBirth),
      email: form.email,
      phone: validate(form.phone),
      address: validate(form.address),
      postCode: validate(form.postCode),
    };

    setForm(localForm);

    if (
      form.name.error ||
      form.lastName.error ||
      form.dateOfBirth.error ||
      form.email.error ||
      form.phone.error ||
      form.address.error ||
      form.postCode.error
    ) {
      return;
    }

    dispatch(
      setModal({
        message: t("edit_profile.modals.save.message"),
        actions: [
          {
            name: t("edit_profile.modals.save.cancel"),
            colortype: BUTTON_COLORTYPE.ERROR,
          },
          {
            action: requestEditProfile(formToSave),
            name: t("edit_profile.modals.save.confirm"),
            colortype: BUTTON_COLORTYPE.PRIMARY,
          },
        ],
      })
    );
  };

  const pressCancel = () => {
    dispatch(
      setModal({
        message: t("edit_profile.modals.cancel.message"),
        actions: [
          {
            name: t("edit_profile.modals.cancel.no"),
            colortype: BUTTON_COLORTYPE.ERROR,
          },
          {
            action: setUserProfile(globalValue),
            name: t("edit_profile.modals.cancel.yes"),
            colortype: BUTTON_COLORTYPE.PRIMARY,
          },
        ],
      })
    );
  };

  const onChange = (newValue: string, fieldName: any) => {
    setForm(formFieldFill(fieldName, newValue, form));
  };

  useEffect(() => {
    cancelHandler();
  }, [userData]);

  const headerLeftElement = () => {
    return edit && !userId ? (
      <TextButton
        text={t("edit_profile.buttons_text.cancel")}
        onPress={pressCancel}
        type="left"
      />
    ) : undefined;
  };

  const headerRightElement = () => {
    if (userId) {
      return undefined;
    }
    return edit ? (
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
    );
  };

  return (
    <TopBar
      pageName={t("edit_profile.title")}
      leftButton={headerLeftElement()}
      rightButton={headerRightElement()}
    >
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.uploadAvatarBox}>
            <UploadAvatar isChangable={!userId} avatar={userData?.avatar}/>
          </View>
          <EditProfileForm edit={edit} form={form} onChangeHandler={onChange} />
        </View>
      </TouchableWithoutFeedback>
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

import React, { useState, useEffect } from "react";
import TopBar from "../layouts/TopBar";
import { useI18n } from "../../translator/i18n";
import { View, StyleSheet } from "react-native";
import UploadAvatar from "../features/UploadAvatar";
import TextButton from "../basics/buttons/TextButton";
import EditProfileForm from "../features/forms/EditProfileForm";
import { toggleBoolValue } from "../../utils/toggleBoolValue";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { UserType } from "../../store/../store/modules/profile/slice";
import { requestEditProfile } from "../../store/modules/profile/action-creators";

export default function EditProfile() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const [edit, setEdit] = useState(false);

  const editHandler = () => toggleBoolValue(edit, setEdit);
  const cancelHandler = () => {
    setLocalValue({
      name: userData?.name,
      lastName: userData?.lastName,
      dateOfBirth: userData?.dateOfBirth,
      email: userData?.email,
      phone: userData?.phone,
      address: userData?.address,
      postCode: userData?.postCode,
    });
    editHandler();
  };
  const saveHandler = () => {
    dispatch(requestEditProfile(localValue));
    editHandler();
  };

  const userData: UserType | undefined = useAppSelector(
    (state) => state.profile.user
  );

  const [localValue, setLocalValue] = useState<UserType>({
    name: userData?.name,
    lastName: userData?.lastName,
    dateOfBirth: userData?.dateOfBirth,
    email: userData?.email,
    phone: userData?.phone,
    address: userData?.address,
    postCode: userData?.postCode,
  });

  useEffect(() => {
    setLocalValue({
      name: userData?.name,
      lastName: userData?.lastName,
      dateOfBirth: userData?.dateOfBirth,
      email: userData?.email,
      phone: userData?.phone,
      address: userData?.address,
      postCode: userData?.postCode,
    });
  }, [userData]);

  return (
    <TopBar
      pageName={t("edit_profile.title")}
      leftButton={
        edit ? (
          <TextButton
            text={t("edit_profile.buttons_text.cancel")}
            onPress={cancelHandler}
            type="left"
          />
        ) : undefined
      }
      rightButton={
        edit ? (
          <TextButton
            text={t("edit_profile.buttons_text.save")}
            onPress={saveHandler}
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
        <EditProfileForm
          edit={edit}
          localValue={localValue}
          setLocalValue={setLocalValue}
        />
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

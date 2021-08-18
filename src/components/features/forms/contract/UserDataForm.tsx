import React from "react";
import { View, StyleSheet } from "react-native";
import TextField from "../../../components/TextField";
import { useI18n } from "../../../../translator/i18n";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {useDispatch} from "react-redux";
import {setScreenData} from "../../../../store/modules/contract/slice";
import {CONTRACT_SCREEN_TYPES} from "../../../../store/modules/contract/constants";
import {useAppSelector} from "../../../../store/hooks";

interface UserDataFormPropsInterface {

}

export default function UserDataForm({}: UserDataFormPropsInterface): JSX.Element {
  const { t } = useI18n();
  const dispatch = useDispatch();

  const userData = useAppSelector(state => state.contract.currentContract?.screens.find(screen => screen.type === CONTRACT_SCREEN_TYPES.USER_DATA))

  const onChangeAction = (value: string, fieldName: string) => {
    dispatch(setScreenData({
      screenType: CONTRACT_SCREEN_TYPES.USER_DATA,
      fieldName,
      value
    }))
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.inputBox}>
        <TextField
          placeholder={t("edit_profile.placeholders.name")}
          value={userData?.data.name}
          onChangeFunction={(newValue) => onChangeAction(newValue, "name")}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.lastName")}
          value={userData?.data.lastName}
          onChangeFunction={(newValue) => onChangeAction(newValue, "lastName")}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.dateOfBirth")}
          value={userData?.data.dateOfBirth}
          onChangeFunction={(newValue) =>
            onChangeAction(newValue, "dateOfBirth")
          }
        />
        <TextField
          placeholder={t("edit_profile.placeholders.email")}
          value={userData?.data.email}
          onChangeFunction={(newValue) => onChangeAction(newValue, "email")}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.phone")}
          value={userData?.data.phone}
          onChangeFunction={(newValue) => onChangeAction(newValue, "phone")}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.address")}
          value={userData?.data.address}
          onChangeFunction={(newValue) => onChangeAction(newValue, "address")}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.postCode")}
          value={userData?.data.postCode}
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
    // height: 520,
    paddingHorizontal: 16,
  },
  formTitle: {
    fontWeight: "600",
    fontFamily: "OS-SB",
  },
});

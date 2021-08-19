import React from "react";
import {StyleSheet, View} from "react-native";
import TextField from "../../../components/TextField";
import {useI18n} from "../../../../translator/i18n";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useDispatch} from "react-redux";
import {setScreenData} from "../../../../store/modules/contract/slice";
import {CONTRACT_SCREEN_TYPES} from "../../../../store/modules/contract/constants";
import {useAppSelector} from "../../../../store/hooks";
import {USER_DATA_FIELDS} from "../../../../store/modules/contract/types";


export default function UserDataForm(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useDispatch();

  const userData = useAppSelector(state => state.contract.currentContract?.screens.find(screen => screen.type === CONTRACT_SCREEN_TYPES.USER_DATA))

  const onChangeAction = (value: string, fieldName: USER_DATA_FIELDS) => {
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
          value={userData?.data[USER_DATA_FIELDS.name]}
          onChangeFunction={(newValue) => onChangeAction(newValue, USER_DATA_FIELDS.name)}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.lastName")}
          value={userData?.data[USER_DATA_FIELDS.lastName]}
          onChangeFunction={(newValue) => onChangeAction(newValue, USER_DATA_FIELDS.lastName)}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.dateOfBirth")}
          value={userData?.data[USER_DATA_FIELDS.dateOfBirth]}
          onChangeFunction={(newValue) =>
            onChangeAction(newValue, USER_DATA_FIELDS.dateOfBirth)
          }
        />
        <TextField
          placeholder={t("edit_profile.placeholders.email")}
          value={userData?.data[USER_DATA_FIELDS.email]}
          onChangeFunction={(newValue) => onChangeAction(newValue, USER_DATA_FIELDS.email)}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.phone")}
          value={userData?.data[USER_DATA_FIELDS.phone]}
          onChangeFunction={(newValue) => onChangeAction(newValue, USER_DATA_FIELDS.phone)}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.address")}
          value={userData?.data[USER_DATA_FIELDS.address]}
          onChangeFunction={(newValue) => onChangeAction(newValue, USER_DATA_FIELDS.address)}
        />
        <TextField
          placeholder={t("edit_profile.placeholders.postCode")}
          value={userData?.data[USER_DATA_FIELDS.postCode]}
          onChangeFunction={(newValue) => onChangeAction(newValue, USER_DATA_FIELDS.postCode)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 16,
  },
  formTitle: {
    fontWeight: "600",
    fontFamily: "OS-SB",
  },
});

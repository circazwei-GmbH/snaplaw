import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import TextField from "../../../components/TextField";
import { useI18n } from "../../../../translator/i18n";
import { useDispatch } from "react-redux";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { useAppSelector } from "../../../../store/hooks";
import {
  USER_DATA_FIELDS,
  UserDataScreenInterface,
} from "../../../../store/modules/contract/types";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import DatePickerModal from "../../Modals/DatePickerModal";
import TextFieldImitation from "../../../components/TextFieldImitation";
import dayjs from "dayjs";

export default function UserDataForm(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useDispatch();
  const [datePickerOpened, setDatePickerOpened] = useState(false);

  const userData = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.USER_DATA
      ) as UserDataScreenInterface | undefined
  );
  const me = useAppSelector((state) => state.profile.user);
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.USER_DATA]
      : undefined
  );

  const onChangeAction = (value: string, fieldName: USER_DATA_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.USER_DATA,
        fieldName,
        value,
      })
    );
    if (screenErrors?.[fieldName] && contractType) {
      dispatch(validateScreen(contractType, CONTRACT_SCREEN_TYPES.USER_DATA));
    }
  };

  useEffect(() => {
    if (userData || !me) {
      return () => {};
    }

    // @ts-ignore
    for (let fieldName in USER_DATA_FIELDS) {
      if (me[fieldName]) {
        dispatch(
          setScreenData({
            screenType: CONTRACT_SCREEN_TYPES.USER_DATA,
            fieldName,
            value: me[fieldName],
          })
        );
      }
    }
  }, [userData]);

  return (
    <View style={styles.inputBox}>
      <TextField
        placeholder={t("edit_profile.placeholders.name")}
        errorMessage={screenErrors?.[USER_DATA_FIELDS.name]}
        value={userData?.data[USER_DATA_FIELDS.name]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, USER_DATA_FIELDS.name)
        }
      />
      <TextField
        placeholder={t("edit_profile.placeholders.lastName")}
        value={userData?.data[USER_DATA_FIELDS.lastName]}
        errorMessage={screenErrors?.[USER_DATA_FIELDS.lastName]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, USER_DATA_FIELDS.lastName)
        }
      />
      <TouchableOpacity
        onPress={() => setDatePickerOpened(true)}
        activeOpacity={0.9}
      >
        <TextFieldImitation
          placeholder={t("edit_profile.placeholders.dateOfBirth")}
          value={
            dayjs(userData?.data[USER_DATA_FIELDS.dateOfBirth]).format(
              "DD.MM.YYYY"
            ) ?? ""
          }
        />
      </TouchableOpacity>
      <TextFieldImitation
        placeholder={t("edit_profile.placeholders.email")}
        value={userData?.data[USER_DATA_FIELDS.email]}
        gray
      />
      <TextField
        keyboardType="phone-pad"
        placeholder={t("edit_profile.placeholders.phone")}
        value={userData?.data[USER_DATA_FIELDS.phone]}
        errorMessage={screenErrors?.[USER_DATA_FIELDS.phone]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, USER_DATA_FIELDS.phone)
        }
      />
      <TextField
        placeholder={t("edit_profile.placeholders.address")}
        value={userData?.data[USER_DATA_FIELDS.address]}
        errorMessage={screenErrors?.[USER_DATA_FIELDS.address]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, USER_DATA_FIELDS.address)
        }
      />
      <TextField
        keyboardType="number-pad"
        placeholder={t("edit_profile.placeholders.postCode")}
        value={userData?.data[USER_DATA_FIELDS.postCode]}
        errorMessage={screenErrors?.[USER_DATA_FIELDS.postCode]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, USER_DATA_FIELDS.postCode)
        }
      />
      <DatePickerModal
        open={datePickerOpened}
        modalHandler={setDatePickerOpened}
        changeDate={onChangeAction}
      />
    </View>
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

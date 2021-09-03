import React from "react";
import { StyleSheet, View } from "react-native";
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
import { birthDateFormat } from "../../../../utils/birthDateFormat";
import { validateScreen } from "../../../../store/modules/contract/action-creators";

export default function UserDataForm(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useDispatch();

  const userData = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.USER_DATA
      ) as UserDataScreenInterface | undefined
  );
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
      <TextField
        maxLength={10}
        keyboardType="number-pad"
        placeholder={t("edit_profile.placeholders.dateOfBirth")}
        value={birthDateFormat(userData?.data[USER_DATA_FIELDS.dateOfBirth])}
        errorMessage={screenErrors?.[USER_DATA_FIELDS.dateOfBirth]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, USER_DATA_FIELDS.dateOfBirth)
        }
      />
      <TextField
        editable={false}
        placeholder={t("edit_profile.placeholders.email")}
        errorMessage={screenErrors?.[USER_DATA_FIELDS.email]}
        value={userData?.data[USER_DATA_FIELDS.email]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, USER_DATA_FIELDS.email)
        }
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

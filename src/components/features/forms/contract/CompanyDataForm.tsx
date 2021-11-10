import React from "react";
import { StyleSheet, View } from "react-native";
import TextField from "../../../components/TextField";
import { useI18n } from "../../../../translator/i18n";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import { CompanyDataScreenInterface, COMPANY_DATA_FIELDS } from "../../../../store/modules/contract/company-data";

export default function CompanyDataForm(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const companyData = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.COMPANY_DATA
      ) as CompanyDataScreenInterface | undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.COMPANY_DATA]
      : undefined
  );

  const onChangeAction = (value: string, fieldName: COMPANY_DATA_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.COMPANY_DATA,
        fieldName,
        value,
      })
    );

    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.COMPANY_DATA)
      );
    }
  };

  return (
    <View style={styles.inputBox}>
      <TextField
        placeholder={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.COMPANY_DATA}.placeholders.companyName`)}
        errorMessage={screenErrors?.[COMPANY_DATA_FIELDS.companyName]}
        value={companyData?.data[COMPANY_DATA_FIELDS.companyName]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, COMPANY_DATA_FIELDS.companyName)
        }
      />
      <TextField
        placeholder={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.COMPANY_DATA}.placeholders.vatId`)}
        errorMessage={screenErrors?.[COMPANY_DATA_FIELDS.vatId]}
        value={companyData?.data[COMPANY_DATA_FIELDS.vatId]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, COMPANY_DATA_FIELDS.vatId)
        }
      />
      <TextField
        placeholder={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.COMPANY_DATA}.placeholders.email`)}
        value={companyData?.data[COMPANY_DATA_FIELDS.email]}
        errorMessage={screenErrors?.[COMPANY_DATA_FIELDS.email]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, COMPANY_DATA_FIELDS.email)
        }
      />
      <TextField
        placeholder={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.COMPANY_DATA}.placeholders.address`)}
        value={companyData?.data[COMPANY_DATA_FIELDS.address]}
        errorMessage={screenErrors?.[COMPANY_DATA_FIELDS.address]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, COMPANY_DATA_FIELDS.address)
        }
      />
      <TextField
        keyboardType="number-pad"
        placeholder={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.COMPANY_DATA}.placeholders.postCode`)}
        value={companyData?.data[COMPANY_DATA_FIELDS.postCode]}
        errorMessage={screenErrors?.[COMPANY_DATA_FIELDS.postCode]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, COMPANY_DATA_FIELDS.postCode)
        }
      />
      <TextField
        keyboardType="phone-pad"
        placeholder={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.COMPANY_DATA}.placeholders.phone`)}
        value={companyData?.data[COMPANY_DATA_FIELDS.phone]}
        errorMessage={screenErrors?.[COMPANY_DATA_FIELDS.phone]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, COMPANY_DATA_FIELDS.phone)
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

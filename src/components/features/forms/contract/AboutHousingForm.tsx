import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import {
  HousingDataScreenInterface,
  HOUSING_DATA_FIELDS,
} from "../../../../store/modules/contract/housing-data";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { useI18n } from "../../../../translator/i18n";
import DefaultSwitch from "../../../basics/switches/DefaultSwitch";
import ErrorBoldMessage from "../../../basics/typography/ErrorBoldMessage";
import MultilineWithPhotos from "../../../components/MultilineWithPhotos";
import TextField from "../../../components/TextField";

const initialState = {
  [HOUSING_DATA_FIELDS.IS_FURNISHED]: false,
};

export default function AboutHousing() {
  const { t } = useI18n();
  const dispatch = useDispatch();

  const [switchers, setSwitchers] = useState(initialState);

  const aboutHousing = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.ABOUT_HOUSING
      ) as HousingDataScreenInterface | undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.ABOUT_HOUSING]
      : undefined
  );

  const photosFurnished =
    aboutHousing?.data[HOUSING_DATA_FIELDS.FURNISHED_PHOTOS];

  const onChangeAction = (value: string, fieldName: HOUSING_DATA_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.ABOUT_HOUSING,
        fieldName,
        value,
      })
    );
    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.ABOUT_HOUSING)
      );
    }
  };
  const onToggleSwitch = (fieldName: HOUSING_DATA_FIELDS) => {
    setSwitchers({
      ...switchers,
      [fieldName]: !switchers[fieldName],
    });

    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.ABOUT_HOUSING,
        fieldName,
        value: !switchers[fieldName],
      })
    );
  };

  useEffect(() => {
    if (aboutHousing) setSwitchers({
        [HOUSING_DATA_FIELDS.IS_FURNISHED]: aboutHousing.data[HOUSING_DATA_FIELDS.IS_FURNISHED]
    });
  }, [aboutHousing]);

  return (
    <>
      <View style={styles.container}>
        <TextField
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.area`
          )}
          errorMessage={screenErrors?.[HOUSING_DATA_FIELDS.AREA]}
          value={aboutHousing?.data[HOUSING_DATA_FIELDS.AREA]}
          onChangeFunction={(newValue) =>
            onChangeAction(newValue, HOUSING_DATA_FIELDS.AREA)
          }
        />
        <TextField
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.roomsNumber`
          )}
          errorMessage={screenErrors?.[HOUSING_DATA_FIELDS.ROOMS_NUMBER]}
          value={aboutHousing?.data[HOUSING_DATA_FIELDS.ROOMS_NUMBER]}
          onChangeFunction={(newValue) =>
            onChangeAction(newValue, HOUSING_DATA_FIELDS.ROOMS_NUMBER)
          }
        />
        <TextField
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.location`
          )}
          errorMessage={screenErrors?.[HOUSING_DATA_FIELDS.LOCATION]}
          value={aboutHousing?.data[HOUSING_DATA_FIELDS.LOCATION]}
          onChangeFunction={(newValue) =>
            onChangeAction(newValue, HOUSING_DATA_FIELDS.LOCATION)
          }
        />
      </View>

      <View style={styles.switchContainer}>
        <DefaultSwitch
          title={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.placeholders.isFurnished`
          )}
          onChange={() => onToggleSwitch(HOUSING_DATA_FIELDS.IS_FURNISHED)}
          value={switchers[HOUSING_DATA_FIELDS.IS_FURNISHED]}
        />
      </View>

      {switchers[HOUSING_DATA_FIELDS.IS_FURNISHED] ? (
        <View style={styles.container}>
          <View style={styles.errorContainer}>
          <ErrorBoldMessage
            text={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.furnished.warning`
            )}
          />
          </View>
          <MultilineWithPhotos
            text={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.furnished.title`
            )}
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.furnished.placeholder`
            )}
            iconText={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.furnished.uploadFiles`
            )}
            fieldName={HOUSING_DATA_FIELDS.FURNISHED_DESCRIPTION}
            photosFieldName={HOUSING_DATA_FIELDS.FURNISHED_PHOTOS}
            photos={photosFurnished ?? []}
            onChangeFunction={(newValue) =>
              onChangeAction(
                newValue,
                HOUSING_DATA_FIELDS.FURNISHED_DESCRIPTION
              )
            }
            description={
              aboutHousing?.data[HOUSING_DATA_FIELDS.FURNISHED_DESCRIPTION] ??
              ""
            }
            errorMessage={
              screenErrors?.[HOUSING_DATA_FIELDS.FURNISHED_DESCRIPTION]
            }
            screenType={CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}
          />
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  switchContainer: {
      paddingVertical: 16,
  },
  errorContainer: {
      paddingBottom: 16,
  }
});

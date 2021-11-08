import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../../translator/i18n";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  AdditionalInfoCarScreenInterface,
  ADDITIONAL_INFO_CAR_FIELDS,
} from "../../../../store/modules/contract/additional-info-car-data";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import DefaultSwitch from "../../../basics/switches/DefaultSwitch";
import MultilineWithPhotos from "../../../components/MultilineWithPhotos";

const initialState = {
  [ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE]: false,
  [ADDITIONAL_INFO_CAR_FIELDS.OTHER_DEFECTS]: false,
};

export default function AdditionalInfoCar(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const [additionalInfo, setAdditionalInfo] = useState(initialState);

  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO]
      : undefined
  );

  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const additionalInfoScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO
      ) as AdditionalInfoCarScreenInterface | undefined
  );

  const photosDamage =
    additionalInfoScreen?.data[ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE_PHOTOS];
  const photosDefects =
    additionalInfoScreen?.data[ADDITIONAL_INFO_CAR_FIELDS.OTHER_DEFECTS_PHOTOS];

  const onToggleSpecification = (fieldName: ADDITIONAL_INFO_CAR_FIELDS) => {
    setAdditionalInfo({
      ...additionalInfo,
      [fieldName]: !additionalInfo[fieldName],
    });

    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO,
        fieldName,
        value: !additionalInfo[fieldName],
      })
    );
  };

  const onChangeAction = (value: string, fieldName: ADDITIONAL_INFO_CAR_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO,
        fieldName,
        value: value,
      })
    );

    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO)
      );
    }
  };

  useEffect(() => {
    if (additionalInfoScreen) setAdditionalInfo(additionalInfoScreen.data);
  }, [additionalInfoScreen]);

  return (
    <View style={styles.container}>
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.fields.accidentDamage`
        )}
        onChange={() =>
          onToggleSpecification(ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE)
        }
        value={additionalInfo.accidentDamage}
      />
      {additionalInfo.accidentDamage ? (
        <View style={styles.inputContainer}>
          <MultilineWithPhotos
            text={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.damage.title`
            )}
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.damage.placeholder`
            )}
            iconText={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.damage.uploadFiles`
            )}
            photosFieldName={ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE_PHOTOS}
            photos={photosDamage ?? []}
            onChangeFunction={(newValue) =>
              onChangeAction(newValue, ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE_DESCRIPTION)
            }
            description={
              additionalInfoScreen?.data[
                ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE_DESCRIPTION
              ] ?? ""
            }
            errorMessage={
              screenErrors?.[ADDITIONAL_INFO_CAR_FIELDS.ACCIDENT_DAMAGE_DESCRIPTION]
            }
            screenType={CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}
          />
        </View>
      ) : null}
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.fields.otherDefects`
        )}
        onChange={() =>
          onToggleSpecification(ADDITIONAL_INFO_CAR_FIELDS.OTHER_DEFECTS)
        }
        value={additionalInfo.otherDefects}
      />
      {additionalInfo.otherDefects ? (
        <View style={styles.inputContainer}>
          <MultilineWithPhotos
            text={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.defect.title`
            )}
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.defect.placeholder`
            )}
            iconText={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.defect.uploadFiles`
            )}
            photosFieldName={ADDITIONAL_INFO_CAR_FIELDS.OTHER_DEFECTS_PHOTOS}
            photos={photosDefects ?? []}
            onChangeFunction={(newValue) =>
              onChangeAction(newValue, ADDITIONAL_INFO_CAR_FIELDS.OTHER_DEFECTS_DESCRIPTION)
            }
            description={
              additionalInfoScreen?.data[
                ADDITIONAL_INFO_CAR_FIELDS.OTHER_DEFECTS_DESCRIPTION
              ] ?? ""
            }
            errorMessage={
              screenErrors?.[ADDITIONAL_INFO_CAR_FIELDS.OTHER_DEFECTS_DESCRIPTION]
            }
            screenType={CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputBox: {
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  switchPadding: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  switchText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  inputContainer: {
    padding: 16,
    paddingBottom: 5,
  },
});

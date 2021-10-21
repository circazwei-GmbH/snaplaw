import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useI18n } from "../../../../translator/i18n";
import DefaultSwitch from "../../../basics/switches/DefaultSwitch";
import { toggleBoolValue } from "../../../../utils/toggleBoolValue";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import {
  SpecificationsDataScreenInterface,
  SPECIFICATIONS_DATA_FIELDS,
} from "../../../../store/modules/contract/specifications-data";
import CalendarInput from "../../../basics/inputs/CalendarInput";
import dayjs from "dayjs";

const initialState = {
  [SPECIFICATIONS_DATA_FIELDS.inspection]: false,
  [SPECIFICATIONS_DATA_FIELDS.commercial]: false,
  [SPECIFICATIONS_DATA_FIELDS.foreignMade]: false,
  [SPECIFICATIONS_DATA_FIELDS.technicalWork]: false,
  [SPECIFICATIONS_DATA_FIELDS.service]: false,
  [SPECIFICATIONS_DATA_FIELDS.deregistered]: false,
};

export default function Specifications(): JSX.Element {
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.SPECIFICATIONS]
      : undefined
  );

  const { t } = useI18n();
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const dispatch = useAppDispatch();

  const specificationsScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.SPECIFICATIONS
      ) as SpecificationsDataScreenInterface | undefined
  );

  const [specifications, serSpecifications] = useState(initialState);

  const onToggleSpecification = (fieldName: SPECIFICATIONS_DATA_FIELDS) => {
    serSpecifications({
      ...specifications,
      [fieldName]: !specifications[fieldName],
    });

    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
        fieldName,
        value: !specifications[fieldName],
      })
    );
  };

  const onChangeAction = (
    value: string,
    fieldName: SPECIFICATIONS_DATA_FIELDS
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
        fieldName,
        value: value,
      })
    );
    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.SPECIFICATIONS)
      );
    }
  };

  useEffect(() => {
    if (specificationsScreen) serSpecifications(specificationsScreen.data);
  }, [specificationsScreen]);

  return (
    <View style={styles.container}>
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.inspection`
        )}
        onChange={() =>
          onToggleSpecification(SPECIFICATIONS_DATA_FIELDS.inspection)
        }
        value={specifications.inspection}
      />
      {specifications.inspection ? (
        <View style={styles.calendarInputContainer}>
          <CalendarInput
            date={specificationsScreen?.data.inspectionDate || ""}
            dateHandler={(date) =>
              onChangeAction(date, SPECIFICATIONS_DATA_FIELDS.inspectionDate)
            }
            placeholder={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.inspectionDate`)}
            errorMessage={screenErrors?.[SPECIFICATIONS_DATA_FIELDS.inspectionDate]}
          />
        </View>
      ) : null}
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.commercial`
        )}
        onChange={() =>
          onToggleSpecification(SPECIFICATIONS_DATA_FIELDS.commercial)
        }
        value={specifications.commercial}
      />
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.foreignMade`
        )}
        onChange={() =>
          onToggleSpecification(SPECIFICATIONS_DATA_FIELDS.foreignMade)
        }
        value={specifications.foreignMade}
      />
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.technicalWork`
        )}
        onChange={() =>
          onToggleSpecification(SPECIFICATIONS_DATA_FIELDS.technicalWork)
        }
        value={specifications.technicalWork}
      />
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.service`
        )}
        onChange={() =>
          onToggleSpecification(SPECIFICATIONS_DATA_FIELDS.service)
        }
        value={specifications.service}
      />
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.deregistered`
        )}
        onChange={() =>
          onToggleSpecification(SPECIFICATIONS_DATA_FIELDS.deregistered)
        }
        value={specifications.deregistered}
      />
      {specifications.deregistered ? (
        <View style={styles.calendarInputContainer}>
          <CalendarInput
            date={specificationsScreen?.data.deregisteredDate || ""}
            dateHandler={(date) =>
              onChangeAction(date, SPECIFICATIONS_DATA_FIELDS.deregisteredDate)
            }
            placeholder={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.placeholders.deregisteredDate`)}
            errorMessage={screenErrors?.[SPECIFICATIONS_DATA_FIELDS.deregisteredDate]}
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
  calendarInputContainer: {
    padding: 16,
    paddingBottom: 5,
  },
});

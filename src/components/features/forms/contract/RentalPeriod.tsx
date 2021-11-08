import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import {
  RentalPeriodScreenInterface,
  RENTAL_PERIOD_FIELDS,
} from "../../../../store/modules/contract/rental-period-data";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { useI18n } from "../../../../translator/i18n";
import CalendarInput from "../../../basics/inputs/CalendarInput";
import DefaultSwitch from "../../../basics/switches/DefaultSwitch";

const initialState = {
  [RENTAL_PERIOD_FIELDS.MIN_TERM]: false,
  [RENTAL_PERIOD_FIELDS.RENTING_LIMITED]: false,
};

export default function RentalPeriod() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const [switchers, setSwitchers] = useState(initialState);

  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.RENTAL_PERIOD]
      : undefined
  );
  const rentalPeriodScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.RENTAL_PERIOD
      ) as RentalPeriodScreenInterface | undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const onToggleSwitcher = (fieldName: RENTAL_PERIOD_FIELDS) => {
    setSwitchers({
      ...switchers,
      [fieldName]: !switchers[fieldName],
    });

    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.RENTAL_PERIOD,
        fieldName,
        value: !switchers[fieldName],
      })
    );
  };

  const onChangeAction = (value: string, fieldName: RENTAL_PERIOD_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.RENTAL_PERIOD,
        fieldName,
        value: value,
      })
    );

    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.RENTAL_PERIOD)
      );
    }
  };

  useEffect(() => {
    if (rentalPeriodScreen) setSwitchers(rentalPeriodScreen.data);
  }, [rentalPeriodScreen]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>
          {t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.startText`
          )}
        </Text>
        <CalendarInput
          testID={RENTAL_PERIOD_FIELDS.START}
          date={rentalPeriodScreen?.data[RENTAL_PERIOD_FIELDS.START] || ""}
          dateHandler={(date) =>
            onChangeAction(date, RENTAL_PERIOD_FIELDS.START)
          }
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.date`
          )}
          errorMessage={screenErrors?.[RENTAL_PERIOD_FIELDS.START]}
        />
      </View>

      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.switchers.${RENTAL_PERIOD_FIELDS.MIN_TERM}`
        )}
        onChange={() => onToggleSwitcher(RENTAL_PERIOD_FIELDS.MIN_TERM)}
        value={switchers[RENTAL_PERIOD_FIELDS.MIN_TERM]}
      />
      {switchers[RENTAL_PERIOD_FIELDS.MIN_TERM] ? (
        <View style={styles.calendarInputContainer}>
          <CalendarInput
            key={RENTAL_PERIOD_FIELDS.MIN_TERM}
            date={
              rentalPeriodScreen?.data[RENTAL_PERIOD_FIELDS.MIN_TERM_DATE] || ""
            }
            dateHandler={(date) =>
              onChangeAction(date, RENTAL_PERIOD_FIELDS.MIN_TERM_DATE)
            }
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.date`
            )}
            errorMessage={screenErrors?.[RENTAL_PERIOD_FIELDS.MIN_TERM_DATE]}
          />
        </View>
      ) : null}
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.switchers.${RENTAL_PERIOD_FIELDS.RENTING_LIMITED}`
        )}
        onChange={() => onToggleSwitcher(RENTAL_PERIOD_FIELDS.RENTING_LIMITED)}
        value={switchers[RENTAL_PERIOD_FIELDS.RENTING_LIMITED]}
      />
      {switchers[RENTAL_PERIOD_FIELDS.RENTING_LIMITED] ? (
        <View style={styles.calendarInputContainer}>
          <CalendarInput
            key={RENTAL_PERIOD_FIELDS.RENTING_LIMITED}
            date={
              rentalPeriodScreen?.data[
                RENTAL_PERIOD_FIELDS.RENTING_LIMITED_DATE
              ] || ""
            }
            dateHandler={(date) =>
              onChangeAction(date, RENTAL_PERIOD_FIELDS.RENTING_LIMITED_DATE)
            }
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.RENTAL_PERIOD}.date`
            )}
            errorMessage={
              screenErrors?.[RENTAL_PERIOD_FIELDS.RENTING_LIMITED_DATE]
            }
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  text: {
    fontFamily: "P",
    fontSize: 16,
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
    paddingHorizontal: 16,
    paddingBottom: 5,
  },
});

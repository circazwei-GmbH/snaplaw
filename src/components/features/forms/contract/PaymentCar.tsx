import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../../translator/i18n";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import {
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
  PaymentScreenInterface,
} from "../../../../store/modules/contract/types";
import { CURRENSY } from "../../../../store/modules/contract/payment";
import DefaultText from "../../../basics/typography/DefaultText";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import AbstractErrorMessage from "../../../basics/typography/AbstractErrorMessage";
import TextField from "../../../components/TextField";
import CalendarInput from "../../../basics/inputs/CalendarInput";
import PaymentLayout from "../../../layouts/PaymentLayout";

export default function PaymentCar() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const contract = useAppSelector((state) => state.contract.currentContract);
  const screenData = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PAYMENT
      ) as PaymentScreenInterface
  );
  const screenErrors = useAppSelector(
    (state) => state.contract.contractErrors?.[CONTRACT_SCREEN_TYPES.PAYMENT]
  );

  const updateDataHandler = (fieldName: PAYMENT_FIELDS, value: string) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName,
        value,
      })
    );
    if (screenErrors?.[fieldName] && contract) {
      dispatch(validateScreen(contract.type, CONTRACT_SCREEN_TYPES.PAYMENT));
    }
  };

  useEffect(() => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.CURRENCY,
        value: CURRENSY.EUR,
      })
    );
  }, []);

  if (!contract) {
    return null;
  }

  return (
    <PaymentLayout updateDataHandler={updateDataHandler}>
      <>
        <DefaultText
          style={[styles.text, styles.secondText]}
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.payment_method`
          )}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkboxes}
            isError={!!screenErrors?.[PAYMENT_FIELDS.PAYMENT_METHOD]}
            isChecked={
              screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
              PAYMENT_METHODS.CASH
            }
            onChange={() =>
              updateDataHandler(
                PAYMENT_FIELDS.PAYMENT_METHOD,
                PAYMENT_METHODS.CASH
              )
            }
            text={t(
              `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`
            )}
          />
          {screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
          PAYMENT_METHODS.CASH ? (
            <View style={styles.additionalDataContainer}>
              <CalendarInput
                dateHandler={(text) =>
                  updateDataHandler(PAYMENT_FIELDS.PAYMENT_DATE, text)
                }
                errorMessage={screenErrors?.[PAYMENT_FIELDS.PAYMENT_DATE]}
                date={screenData?.data[PAYMENT_FIELDS.PAYMENT_DATE] || ""}
                placeholder={t(
                  `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.payment_date`
                )}
              />
            </View>
          ) : null}

          <Checkbox
            style={styles.checkboxes}
            isError={!!screenErrors?.[PAYMENT_FIELDS.PAYMENT_METHOD]}
            isChecked={
              screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
              PAYMENT_METHODS.TRANSFER
            }
            onChange={() =>
              updateDataHandler(
                PAYMENT_FIELDS.PAYMENT_METHOD,
                PAYMENT_METHODS.TRANSFER
              )
            }
            text={t(
              `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
            )}
          />
          {screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
          PAYMENT_METHODS.TRANSFER ? (
            <View style={styles.additionalDataContainer}>
              <CalendarInput
                dateHandler={(text) =>
                  updateDataHandler(PAYMENT_FIELDS.DUE_DATE, text)
                }
                errorMessage={screenErrors?.[PAYMENT_FIELDS.DUE_DATE]}
                date={screenData?.data[PAYMENT_FIELDS.DUE_DATE] || ""}
                placeholder={t(
                  `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.due_date`
                )}
              />
            </View>
          ) : null}

          <Checkbox
            style={styles.checkboxes}
            isError={!!screenErrors?.[PAYMENT_FIELDS.PAYMENT_METHOD]}
            isChecked={
              screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
              PAYMENT_METHODS.CASH_ADVANCE
            }
            onChange={() =>
              updateDataHandler(
                PAYMENT_FIELDS.PAYMENT_METHOD,
                PAYMENT_METHODS.CASH_ADVANCE
              )
            }
            text={t(
              `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash_advance`
            )}
          />
          {screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
          PAYMENT_METHODS.CASH_ADVANCE ? (
            <View style={styles.additionalDataContainer}>
              <CalendarInput
                dateHandler={(text) =>
                  updateDataHandler(PAYMENT_FIELDS.ADVANCE_DATE, text)
                }
                errorMessage={screenErrors?.[PAYMENT_FIELDS.ADVANCE_DATE]}
                date={screenData?.data[PAYMENT_FIELDS.ADVANCE_DATE] || ""}
                placeholder={t(
                  `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.advance_date`
                )}
              />
              <TextField
                onChangeFunction={(text) =>
                  updateDataHandler(PAYMENT_FIELDS.ADVANCE_COST, text)
                }
                errorMessage={screenErrors?.[PAYMENT_FIELDS.ADVANCE_COST]}
                value={screenData?.data[PAYMENT_FIELDS.ADVANCE_COST]}
                placeholder={t(
                  `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.advance_cost`
                )}
              />
              <CalendarInput
                dateHandler={(text) =>
                  updateDataHandler(PAYMENT_FIELDS.LEFT_SUM, text)
                }
                errorMessage={screenErrors?.[PAYMENT_FIELDS.LEFT_SUM]}
                date={screenData?.data[PAYMENT_FIELDS.LEFT_SUM] || ""}
                placeholder={t(
                  `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.left_sum`
                )}
              />
            </View>
          ) : null}
        </View>
        <AbstractErrorMessage
          message={screenErrors?.[PAYMENT_FIELDS.PAYMENT_METHOD]}
        />
      </>
    </PaymentLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  checkboxContainer: {
    marginTop: 14,
  },
  checkboxes: {
    marginTop: 10,
  },
  text: {
    fontSize: 16,
  },
  secondText: {
    marginTop: 24,
  },
  additionalDataContainer: {
    paddingBottom: 14,
  },
});
